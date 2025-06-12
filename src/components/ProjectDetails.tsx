import { useNavigate } from "react-router-dom";
import { BackwardIcon } from "@heroicons/react/24/solid";
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
        <div className="w-full lg:mx-5 sm:mx-0 my-10">
          <div className="flex justify-between gap-4">
            <TableHeader>Project Name</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Start Date</TableHeader>
            <TableHeader>End Date</TableHeader>
            <TableHeader>Team Members</TableHeader>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Projects;
