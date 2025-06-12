import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";

const Projects = lazy(() => import("./components/Projects"));
const ProjectDetails = lazy(() => import("./components/ProjectDetails"));

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
