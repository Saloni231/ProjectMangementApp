import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClickFunc: Function;
}

const Button: React.FC<ButtonProps> = ({ children, onClickFunc }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickFunc();
  };

  return (
    <button
      className="p-4 bg-violet-950 text-white rounded-lg flex max-w-full gap-1 justify-center items-center hover:-translate-y-2 hover:bg-white hover:text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
