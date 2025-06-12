import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  label: string;
  selectedValues: string[];
  onSelect: Function;
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  label,
  selectedValues,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["React", "Vue", "Angular", "Svelte"];

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelect(selectedValues.filter((v) => v !== value));
    } else {
      onSelect([...selectedValues, value]);
    }
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
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-violet-50 cursor-pointer flex items-center"
            >
              <input
                type="checkbox"
                checked={isSelected(option)}
                readOnly
                className="mr-2"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
