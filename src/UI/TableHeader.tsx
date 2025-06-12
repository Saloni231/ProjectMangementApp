import { ReactNode } from "react";

const TableHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex-1 text-violet-900 font-semibold text-xl flex items-center">
      {children}
    </div>
  );
};

export default TableHeader;
