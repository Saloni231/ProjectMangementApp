import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import TableHeader from "../UI/TableHeader";
import { Project, SortKey, useProjects } from "../store/projectData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TableProps {
  projects: Project[];
  setSelectedAction: React.Dispatch<
    React.SetStateAction<{ action: string; project: Project | null }>
  >;
}

const Table: React.FC<TableProps> = ({ setSelectedAction, projects }) => {
  const [sortStatus, setSortStatus] = useState({
    startDate: "asc",
    endDate: "asc",
    teamMember: "asc",
  });

  const navigate = useNavigate();

  const { sortProject } = useProjects();

  const handleSort = (key: SortKey) => {
    const updateSortStatus = sortStatus[key] === "asc" ? "desc" : "asc";
    sortProject(key, updateSortStatus);
    setSortStatus({ ...sortStatus, [key]: updateSortStatus });
  };

  const handleProjectSelect = (id: number) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto">
      <table className="min-w-[640px] w-full border border-purple-300 text-sm text-left bg-white rounded shadow">
        <thead className="bg-purple-100 text-violet-800">
          <tr>
            <TableHeader>Project Name</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader
              sortIcon
              iconDirection={sortStatus.startDate}
              sortFunc={() => handleSort("startDate")}
            >
              Start Date
            </TableHeader>
            <TableHeader
              sortIcon
              iconDirection={sortStatus.endDate}
              sortFunc={() => handleSort("endDate")}
            >
              End Date
            </TableHeader>
            <TableHeader
              sortIcon
              iconDirection={sortStatus.teamMember}
              sortFunc={() => handleSort("teamMember")}
            >
              Team Members
            </TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody className="text-purple-900">
          {projects.map((project, index) => (
            <tr
              key={index}
              className="border-t border-purple-200 hover:bg-purple-50 transition"
            >
              <td
                className="px-4 py-3 font-semibold hover:underline"
                onClick={() => handleProjectSelect(project.id as number)}
              >
                {project.projectName}
              </td>
              <td className="px-4 py-3">{project.status}</td>
              <td className="px-4 py-3">{project.startDate}</td>
              <td className="px-4 py-3">{project.endDate}</td>
              <td className="px-4 py-3">
                <div className="flex -space-x-2">
                  {project.teamMember
                    .slice(0, 5)
                    .map((member: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-semibold border-2 border-white"
                        title={member}
                      >
                        {member
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    ))}
                  {project.teamMember.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-semibold border-2 border-white">
                      +{project.teamMember.length - 5}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedAction({ action: "edit", project })}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-sm text-red-600 hover:text-red-800"
                  onClick={() =>
                    setSelectedAction({ action: "delete", project })
                  }
                >
                  <TrashIcon className="w-5, h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
