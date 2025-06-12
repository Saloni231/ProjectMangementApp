import { ReactNode } from "react";

const Heading: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h1 className="text-xl sm:text-4xl font-bold text-black">{children}</h1>
  );
};

export default Heading;
