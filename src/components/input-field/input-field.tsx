import { useState } from "react";
import { TextFieldProps } from "@/type/types";

const Textfield: React.FC<TextFieldProps> = ({
  name,
  label,
  required,
  subtype,
  register,
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          required={required}
          value={value}
          onChange={onChange}
          type={
            subtype === "password" && showPassword ? "text" : subtype || "text"
          }
          placeholder={`Enter ${label}`}
          {...register}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {subtype === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Textfield;
