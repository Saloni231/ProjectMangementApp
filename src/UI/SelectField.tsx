interface SelectFieldProps {
  placeholder: string;
  label: string;
  selected: string | string[];
  options: string[];
  handleSelect: Function;
}

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  label,
  selected,
  options,
  handleSelect,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelect(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md my-5">
      <select
        id={placeholder}
        value={selected}
        className="peer w-full border border-violet-950 bg-transparent px-3 pt-5 pb-2 text-violet-950 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-700"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="" disabled selected hidden></option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={placeholder}
        className={`absolute left-3 px-1 bg-white text-violet-950 transition-all ${
          selected ? "-top-3 text-sm" : "top-3 text-base"
        } peer-focus:-top-3 peer-focus:text-sm`}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectField;
