import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Project, useProjects } from "../store/projectData"; // Adjust path accordingly

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  const { projects } = useProjects();

  const navigate = useNavigate();

  useEffect(() => {
    const selected = projects.find((proj) => proj.id === id);
    if (selected) setProject(selected);
  }, [id, projects]);

  if (!project)
    return <div className="text-center mt-10">Project not found</div>;

  const getProgress = () => {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const today = new Date();
    const total = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const passed = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    const percent = Math.min((passed / total) * 100, 100);
    return Math.max(0, Math.floor(percent));
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen mx-auto p-6 bg-gradient-to-b from-white to-purple-500 rounded shadow text-purple-950 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-600 hover:text-black hover:underline hover:-translate-y-2 font-medium flex items-center"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{project.projectName}</h1>
      <p className="mb-2">
        <strong>Description:</strong> {project.projectDescription}
      </p>
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
          {project.status}
        </span>
      </p>
      <p className="mb-2">
        <strong>Start Date:</strong> {project.startDate}
      </p>
      <p className="mb-2">
        <strong>End Date:</strong> {project.endDate}
      </p>

      <div className="mb-4">
        <strong>Progress:</strong>
        <div className="w-full md:w-6/12 bg-purple-100 rounded-full h-4 mt-1">
          <div
            className="bg-violet-900 h-4 rounded-full text-xs text-white text-center"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>

      <div>
        <strong>Team Members:</strong>
        <ul className="mt-2 list-disc pl-6">
          {project.teamMember.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail;
