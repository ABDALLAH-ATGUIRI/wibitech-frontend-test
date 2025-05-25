// routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { ProtectedRoute } from "@/context/AuthContext";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;
