import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Heading from "../UI/Heading";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/projects");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 to-white flex items-center justify-center flex-col font-sans gap-10">
      <Heading>Welcome to Project Management!</Heading>
      <Button onClickFunc={handleClick}>
        View Projects <ArrowRightCircleIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Home;
