import React, { useState } from "react";
import Search from "../components/Search";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white w-full h-16 flex items-center justify-between">
        {/* Toggle Sidebar Button */}
        <button
          className="bg-gray-700 text-white rounded-md px-4 py-2 ml-4 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Search />
        <div className="w-16"></div>
      </header>
      <div className="flex-grow flex">
        {/* Left Sidebar */}
        <aside
          className={`min-w-[200px] ${
            isSidebarOpen ? "block" : "hidden"
          } md:block bg-gray-700 text-white  flex flex-col`}
        >
          <nav className="p-4">Sidebar</nav>
        </aside>

        {/* Main Area */}
        <main className="flex-grow bg-gray-100 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
