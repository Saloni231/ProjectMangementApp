import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClickFunc: Function;
  classList?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClickFunc,
  classList,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickFunc();
  };

  return (
    <button
      className={`px-4 py-2 font-semibold bg-violet-950 text-white rounded-lg flex gap-1 justify-center items-center hover:-translate-y-2 hover:bg-white hover:text-black hover:outline-none hover:ring-2 hover:ring-violet-800 ${classList}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
