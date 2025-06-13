import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface TableHeaderProps {
  children: ReactNode;
  sortIcon?: boolean;
  sortFunc?: Function | null;
  iconDirection?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  sortIcon,
  sortFunc,
  iconDirection,
}) => {
  const handleSorting = () => {
    sortFunc && sortFunc();
  };

  return (
    <th className="px-4 py-2 border">
      {sortIcon && (
        <div className="flex items-center gap-1" onClick={handleSorting}>
          {children}
          {iconDirection === "asc" ? (
            <ArrowUpIcon className="h-4 w-4 text-purple-600 cursor-pointer hover:-translate-y-1 hover:text-black" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-purple-600 cursor-pointer hover:-translate-y-1 hover:text-black" />
          )}
        </div>
      )}
      {!sortIcon && children}
    </th>
  );
};

export default TableHeader;
