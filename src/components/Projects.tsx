import { useNavigate } from "react-router-dom";
import { BackwardIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import Input from "../UI/Input";
import TableHeader from "../UI/TableHeader";

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-800 justify-items-center font-sans">
      <button
        className="fixed top-4 left-4 text-violet-950 hover:text-black hover:-translate-y-1 text-sm flex items-center"
        onClick={handleClick}
      >
        <BackwardIcon className="h-4 w-4" />
        Back
      </button>

      <h1 className="font-bold text-2xl text-violet-950 mt-10">PROJECT LIST</h1>
      <div className="lg:w-10/12 sm:w-full">
        <div className="flex my-4 justify-between">
          <Input placeholder={"Search.."} />
          <select className="p-1 border-2 border-violet-950 rounded-lg px-2 m-2 text-violet-950 font-semibold">
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="OnHold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
                <thead className="bg-purple-100 text-purple-700">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 whitespace-nowrap">Start Date</th>
                    <th className="px-4 py-3 whitespace-nowrap">End Date</th>
                    <th className="px-4 py-3 whitespace-nowrap">
                      Team Members
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">In Progress</td>
                    <td className="px-4 py-3">2025-06-01</td>
                    <td className="px-4 py-3">2025-07-15</td>
                    <td className="px-4 py-3">Alice, Bob</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
