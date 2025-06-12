import { useNavigate } from "react-router-dom";
import { BackwardIcon } from "@heroicons/react/24/solid";
import Input from "../UI/Input";
import TableHeader from "../UI/TableHeader";

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return <div></div>;
};

export default Projects;
