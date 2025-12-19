import React from "react";
import UserSidebar from './UserSidebar';
import UserNavbar from './UserNavbar';

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <UserNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
