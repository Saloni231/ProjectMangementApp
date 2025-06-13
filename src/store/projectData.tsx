import { createContext, useContext, useEffect, useState } from "react";

export type Project = {
  id?: number;
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  status: string;
  teamMember: string[];
};

export type SortKey = "startDate" | "endDate" | "teamMember";

export type ProjectContextType = {
  projects: Project[];
  addProject: (project: Project, onClose: Function) => void;
  editProject: (project: Project, onClose: Function) => void;
  deleteProject: (project: Project) => void;
  sortProject: (key: SortKey, direction: "asc" | "desc") => void;
  error?: string;
};

export const projectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export const useProjects = () => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};

const URL = "http://localhost:5000/Projects";

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  const addProject = (project: Project, onClose: Function) => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((newProject) => {
        setProjects((prev) => [...prev, newProject]);
        onClose();
      })
      .catch(() => {
        setError("Failed to save project");
      });
  };

  const editProject = (project: Project, onClose: Function) => {
    fetch(`${URL}/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then(() => {
        setProjects((prev) =>
          prev.map((proj) => (proj.id === project.id ? project : proj))
        );
        onClose();
      })
      .catch(() => {
        setError("Failed to update project");
      });
  };

  const deleteProject = (project: Project) => {
    fetch(`${URL}/${project.id}`, { method: "DELETE" })
      .then(() => {
        setProjects((prev) => prev.filter((proj) => proj.id !== project.id));
      })
      .catch(() => {
        setError("Failed to delete project");
      });
  };

  const sortProject = (key: SortKey, direction: "asc" | "desc") => {
    const sorted = [...projects].sort((a, b) => {
      let aValue: any = a[key];
      let bValue: any = b[key];

      if (key === "startDate" || key === "endDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (key === "teamMember") {
        aValue = aValue.length;
        bValue = bValue.length;
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setProjects(sorted);
  };

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setProjects(data));
    fetch("http://localhost:5000/TeamMembers")
      .then((res) => res.json())
      .then((data) =>
        localStorage.setItem("teamMembers", JSON.stringify(data))
      );
  }, []);

  const value = {
    projects,
    addProject,
    editProject,
    deleteProject,
    error,
    sortProject,
  };

  return (
    <projectContext.Provider value={value}>{children}</projectContext.Provider>
  );
};
