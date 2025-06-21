import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import Logo from "@/components/logo";
import Input from "@/components/Input";
import { loginRequest } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

// Main Login Component
export const Login = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginRequest(username, password);

    if (response.success) {
      const { user } = response;
      login(user, user.token);
    } else {
      setError(response?.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-white">
      <div className="w-full max-w-md border border-[#007fff] rounded-[25px]">
        <div className="flex items-start justify-between p-6 pb-0 space-y-0">
          <Logo />
        </div>
        <div className="flex flex-col items-center gap-[30px] p-6 pt-10">
          <div className="flex flex-col items-start justify-center gap-2.5 w-full">
            <h2 className="font-semibold text-[28px] leading-7 text-center w-full">
              Login
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <Input
              label="Username"
              id="username"
              type="text"
              value={username}
              placeholder="abdallah-atguiri"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
            />
            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}

            
            <Button
              type="submit"
              className="!p-6 w-full rounded-2xl font-semibold"
              loading={loading}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
