import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import Search from "../components/Search";
import { useMealStore } from "../hooks/useMealStore";

const sideMenuItems: {
  icon: string;
  title: string;
  path: string;
}[] = [
  {
    icon: "favorite",
    title: "Favorites",
    path: "favorite",
  },
  {
    icon: "restaurant_menu",
    title: "My Meals",
    path: "my-meals",
  },
  {
    icon: "tab_recent",
    title: "Recent Meals",
    path: "recent",
  },
  {
    icon: "settings",
    title: "Setting",
    path: "setting",
  },
  {
    icon: "help",
    title: "Help",
    path: "help",
  },
];

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-green-400 w-full h-16 flex items-center justify-between py-4 relative">
        {/* Toggle Sidebar Button */}
        <button
          className="px-4 p-2 hover:bg-green-500 active:bg-green-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon title="menu" className="text-4xl" />
        </button>
        <a href="/">
          <h2 className="flex items-center gap-4">
            <p className="text-2xl">
              <Logo />
            </p>
            <span className="text-2xl">
              <b className="text-orange-600">H</b>appy
              <b className="text-orange-600">M</b>eal
            </span>
          </h2>
        </a>
        <Search />
        <div className="w-fit pr-4">
          <a href="#">Login / Sign Up</a>
        </div>
      </header>
      <div className="flex-grow flex">
        {/* Left Sidebar */}
        <aside
          className={`min-w-[200px] ${
            isSidebarOpen ? "block" : "hidden"
          } bg-green-100  flex flex-col`}
        >
          <nav className="p-4">
            <ul className="pt-6 flex flex-col gap-6">
              {sideMenuItems.map((item) => (
                <li
                  key={item.icon}
                  className="hover:text-xl hover:text-orange-500"
                >
                  <Link to={item.path} className="flex items-center gap-2 ">
                    <Icon title={item.icon} />
                    <p>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="flex-grow bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
