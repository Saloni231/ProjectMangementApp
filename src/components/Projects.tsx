import { useNavigate } from "react-router-dom";
import {
  BackwardIcon,
  FaceFrownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import InputField from "../UI/Input";
import TableHeader from "../UI/TableHeader";
import Heading from "../UI/Heading";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState } from "react";
import SelectField from "../UI/SelectField";
import MultiSelectDropdown from "../UI/MultiSelect";

const Projects: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [teamMember, setTeamMember] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  const handleCreate = () => {
    setStatus("");
    setTeamMember([]);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    console.log(
      projectName,
      projectDescription,
      startDate,
      endDate,
      status,
      teamMember
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-500 px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={handleClick}
          className="text-md text-purple-700 font-medium flex items-center hover:underline hover:text-black hover:-translate-y-1"
        >
          <BackwardIcon className="w-5 h-5" /> Back
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-purple-900 text-center">
          PROJECT LIST
        </h1>
        <Button classList="flex items-center gap-2" onClickFunc={handleCreate}>
          <PlusIcon className="w-4 h-4" />
          Create Project
        </Button>
      </div>

      {true && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 max-w-6xl mx-auto mt-10">
            <input
              type="text"
              className={
                "w-full sm:w-1/3 px-4 py-2 border border-purple-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-violet-900 font-semibold"
              }
              placeholder={"Search.."}
            />
            <select className="w-full sm:w-1/6 px-4 py-2 border border-purple-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-violet-900 font-semibold">
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="OnHold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="min-w-[640px] w-full border border-purple-300 text-sm text-left bg-white rounded shadow">
              <thead className="bg-purple-100 text-violet-800">
                <tr>
                  <TableHeader>Project Name</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader sortIcon>Start Date</TableHeader>
                  <TableHeader sortIcon>End Date</TableHeader>
                  <TableHeader sortIcon>Team Members</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="text-purple-900"></tbody>
            </table>
          </div>
        </>
      )}

      {false && (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
          <FaceFrownIcon className="w-16 h-16 text-violet-950 mb-4" />
          <Heading>No Projects Found</Heading>
          <p className="text-lg sm:text-base text-black m-5 max-w-md">
            Create New One!!
          </p>
        </div>
      )}

      <Modal
        title="Create Project"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <InputField
          placeholder="projectName"
          label="Project Name"
          type="text"
          value={projectName}
          handleChange={setProjectName}
        />
        <InputField
          placeholder="projectDescription"
          label="Project Description"
          type="textarea"
          value={projectDescription}
          handleChange={setProjectDescription}
        />
        <InputField
          placeholder="startDate"
          label="Start Date"
          type="date"
          value={startDate}
          handleChange={setStartDate}
        />
        <InputField
          placeholder="endDate"
          label="End Date"
          type="date"
          value={endDate}
          handleChange={setEndDate}
        />
        <SelectField
          label="Status"
          selected={status}
          placeholder="status"
          options={["Active", "On Hold", "Completed"]}
          handleSelect={setStatus}
        />
        <MultiSelectDropdown
          label="Team Members"
          selectedValues={teamMember}
          onSelect={setTeamMember}
        />
        <Button onClickFunc={handleSubmit} classList="mt-5 w-full">
          Create
        </Button>
      </Modal>
    </div>
  );
};

export default Projects;
