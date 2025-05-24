import { useAuth } from "@/context/AuthContext";
import { LogOutIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between mb-8 relative">
      <div className="flex items-center gap-2">
        <div className="relative w-7 h-7 bg-[#007fff] rounded-lg flex items-center justify-center">
          <img className="w-4 h-3" alt="Vector" src="/vector.svg" />
        </div>
        <img className="w-[44.27px] h-[15.26px]" alt="Taski" src="/taski.svg" />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span className="text-sm font-medium">{user?.username}</span>
          <div className="w-8 h-8 rounded-full bg-[#007fff] flex items-center justify-center">
            <span className="text-white text-sm uppercase">
              {user?.username?.[0] || "U"}
            </span>
          </div>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
            <button
              onClick={logout}
              className="flex block w-full px-4 py-2 gap-2 items-center font-semibold text-left text-sm text-red-600 hover:bg-gray-100"
            >
              Logout <LogOutIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
