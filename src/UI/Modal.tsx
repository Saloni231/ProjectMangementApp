import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: Function;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={handleClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-purple-900 text-center">
          {title}
        </h1>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
