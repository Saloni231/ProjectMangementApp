interface SelectFieldProps {
  placeholder: string;
  label: string;
  selected: string;
  options: string[];
  handleSelect?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  selectRef?: React.Ref<HTMLSelectElement>;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  label,
  selected,
  options,
  handleSelect,
  onChange,
  onBlur,
  name,
  selectRef,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (handleSelect) handleSelect(e.target.value);
    if (onChange) onChange(e); // pass to react-hook-form
  };

  return (
    <div className="relative w-full max-w-md my-5">
      <select
        id={placeholder}
        name={name}
        ref={selectRef}
        value={selected}
        className="peer w-full border border-violet-950 bg-transparent px-3 pt-5 pb-2 text-violet-950 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-700"
        onChange={handleChange}
        onBlur={onBlur}
      >
        <option value="" disabled hidden></option>
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
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
