import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackwardIcon,
  FaceFrownIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Heading from "../UI/Heading";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Form from "../UI/Form";
import { useProjects, Project } from "../store/projectData";
import Table from "../UI/Table";

const Projects: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAction, setSelectedAction] = useState<{
    action: string;
    project: Project | null;
  }>({
    action: "",
    project: null,
  });

  const { projects, deleteProject } = useProjects();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    setModalOpen(true);
  };

  const modalTitle = () => {
    switch (selectedAction.action) {
      case "edit":
        return "Edit Project";
      case "delete":
        return "Confirm Delete";
      default:
        return "Create Project";
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedAction({
      action: "",
      project: null,
    });
  };

  const handleDelete = () => {
    deleteProject(selectedAction.project as Project);
    handleClose();
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchInput.toLowerCase()) &&
      (project.status === statusFilter || statusFilter === "All")
  );

  useEffect(() => {
    if (
      selectedAction.action === "edit" ||
      selectedAction.action === "delete"
    ) {
      setModalOpen(true);
    }
  }, [selectedAction]);

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

      {projects.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 max-w-6xl mx-auto mt-10">
            <input
              type="text"
              className={
                "w-full sm:w-1/3 px-4 py-2 border border-purple-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-violet-900 font-semibold"
              }
              placeholder={"Search.."}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
              className="w-full sm:w-1/6 px-4 py-2 border border-purple-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-violet-900 font-semibold"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <Table
            setSelectedAction={setSelectedAction}
            projects={filteredProjects}
          />
        </>
      )}

      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4 w-11/12">
          <FaceFrownIcon className="w-16 h-16 text-violet-950 mb-4" />
          <Heading>No Projects Found</Heading>
          <p className="text-lg sm:text-base text-black m-5 max-w-md">
            Create New One!!
          </p>
        </div>
      )}

      <Modal title={modalTitle()} isOpen={modalOpen} onClose={handleClose}>
        {selectedAction.action !== "delete" && (
          <Form
            handleClose={handleClose}
            edit={selectedAction.action === "edit"}
            projectData={selectedAction.project as Project}
          />
        )}
        {selectedAction.action === "delete" && (
          <>
            <p className="text-purple-900 m-4 mb-8">
              Are you sure you want to delete{" "}
              <strong>{selectedAction.project?.projectName}</strong>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                classList="bg-gray-300 text-purple-800 "
                onClickFunc={handleClose}
              >
                Cancel
              </Button>
              <Button
                classList="bg-red-600 text-white"
                onClickFunc={handleDelete}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Projects;
