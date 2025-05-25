import React from "react";

interface Item {
  id: string | number;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  items: Item[];
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  items,
  value,
  onChange,
  placeholder = "Select a user",
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="font-bold text-md leading-[14px]">
        {label}
      </label>{" "}
      <div className="flex items-center gap-2.5 p-[15px] w-full bg-[#f5f7f9] rounded-[15px]">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {items.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
