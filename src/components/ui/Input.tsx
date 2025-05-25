import React, { FC, useState } from "react";
import clsx from "clsx";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./button";

type InputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  className?: string;
  required?: boolean;
};

export const Input: FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={clsx("flex flex-col gap-2.5 w-full", className)}>
      <label htmlFor={id} className="font-bold text-md leading-[14px]">
        {label}
      </label>

      <div
        className={clsx(
          "flex items-center gap-2.5 p-[15px] w-full bg-[#f5f7f9] rounded-[15px]",
          isPassword ? "justify-between h-12" : "h-12"
        )}
      >
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "w-full bg-transparent outline-none",
            type === "textarea" && " resize-none h-24"
          )}
          required={required}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-6 w-6" />
            ) : (
              <EyeIcon className="h-6 w-6" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Input;
