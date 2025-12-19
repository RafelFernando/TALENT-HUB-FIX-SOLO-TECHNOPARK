import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { ToastContainer } from "react-toastify";


export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
