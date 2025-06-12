import { ReactNode } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface TableHeaderProps {
  children: ReactNode;
  sortIcon?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, sortIcon }) => {
  return (
    <th className="px-4 py-2 border">
      {sortIcon && (
        <div className="flex items-center gap-1">
          {children}
          <ArrowUpIcon className="h-4 w-4 text-purple-600 cursor-pointer hover:-translate-y-1 hover:text-black" />
        </div>
      )}
      {!sortIcon && children}
    </th>
  );
};

export default TableHeader;
