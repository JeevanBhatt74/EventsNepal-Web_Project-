import Cookies from "js-cookie";
import { SidebarComponent } from "./sidebar";
import { Navigate } from "react-router-dom";

export default function AdminLayout() {
  const adminToken = Cookies.get("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <main>
      <SidebarComponent />
    </main>
  );
}
