import React from "react";
import ProviderSidebar from './ProviderSidebar';
import ProviderNavbar from "./ProviderNavbar";

export default function ProviderLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <ProviderSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ProviderNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}