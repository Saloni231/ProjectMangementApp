interface InputProps {
  placeholder: string;
  label: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  name?: string;
  inputRef?: React.Ref<any>;
  error?: string;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  label,
  type,
  value,
  onChange,
  onBlur,
  name,
  inputRef,
  error,
}) => {
  const sharedClasses =
    "peer w-full border border-violet-950 bg-transparent px-3 pt-5 pb-2 text-violet-950 placeholder-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-violet-700";

  return (
    <div className="relative w-full max-w-md my-5">
      {type === "textarea" ? (
        <textarea
          id={placeholder}
          placeholder=" "
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={inputRef}
          rows={4}
          className={`${sharedClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          id={placeholder}
          placeholder=" "
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={inputRef}
          className={sharedClasses}
        />
      )}
      <label
        htmlFor={placeholder}
        className="absolute left-3 -top-3 px-1 bg-white text-violet-950 text-sm transition-all 
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-violet-950 peer-focus:-top-3 
          peer-focus:text-sm peer-focus:bg-white peer-focus:text-violet-950"
      >
        {label}
      </label>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
