import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  label: string;
  selectedValues: string[];
  onSelect?: (values: string[]) => void;
  name?: string;
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
}

type option = {
  id: number;
  name: string;
};

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  label,
  selectedValues,
  onSelect,
  name,
  onChange,
  onBlur,
  inputRef,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const optionsData = localStorage.getItem("teamMembers");
  let options: option[] = [];
  if (optionsData) {
    options = JSON.parse(optionsData);
  }

  const handleSelect = (value: string) => {
    let updatedValues;
    if (selectedValues.includes(value)) {
      updatedValues = selectedValues.filter((v) => v !== value);
    } else {
      updatedValues = [...selectedValues, value];
    }
    onChange?.(updatedValues);
    onSelect?.(updatedValues);
  };

  const isSelected = (value: string) => selectedValues.includes(value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md my-5" ref={dropdownRef}>
      <input
        type="text"
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        value={selectedValues.join(", ")}
        placeholder=" "
        onBlur={onBlur}
        name={name}
        ref={inputRef}
        className="peer w-full border border-violet-950 bg-white px-3 pt-6 pb-2 text-violet-950 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-700 cursor-pointer"
      />

      <label
        className={`absolute left-3 px-1 bg-white text-violet-950 transition-all pointer-events-none
        ${
          selectedValues.length || isOpen
            ? "-top-2.5 text-sm"
            : "top-3 text-base"
        } peer-focus:-top-2.5 peer-focus:text-sm`}
      >
        {label}
      </label>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-violet-950 rounded-md shadow-md max-h-40 overflow-y-auto">
          {options.length > 0 &&
            options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option.name)}
                className="px-4 py-2 hover:bg-violet-50 cursor-pointer flex items-center"
              >
                <input
                  type="checkbox"
                  checked={isSelected(option.name)}
                  readOnly
                  className="mr-2"
                />
                {option.name}
              </li>
            ))}
        </ul>
      )}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelectDropdown;
