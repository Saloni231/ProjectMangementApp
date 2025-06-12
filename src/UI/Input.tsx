interface InputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <input
      className="border-2 border-violet-950 rounded-lg p-1 px-2 m-2 text-violet-950 font-semibold"
      placeholder={placeholder}
    />
  );
};

export default Input;
