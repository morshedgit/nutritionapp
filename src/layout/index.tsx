import React, { useState } from "react";
import Logo from "../components/Logo";
import Search from "../components/Search";

const sideMenuItems: {
  icon: string;
  title: string;
}[] = [
  {
    icon: "favorite",
    title: "Your Favorite",
  },
  {
    icon: "restaurant_menu",
    title: "Your Recipes",
  },
  {
    icon: "tab_recent",
    title: "Recent Meals",
  },
  {
    icon: "settings",
    title: "Setting",
  },
  {
    icon: "help",
    title: "Help",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-green-400 w-full h-16 flex items-center justify-between py-4 relative">
        {/* Toggle Sidebar Button */}
        <button
          className="rounded-md p-4 hover:bg-green-500 active:bg-green-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="material-symbols-outlined text-4xl">menu</span>
        </button>
        <h2 className="flex items-center gap-4">
          <p className="text-2xl">
            <Logo />
          </p>
          <span className="text-2xl">
            <b className="text-orange-600">H</b>appy
            <b className="text-orange-600">M</b>eal
          </span>
        </h2>
        <Search />
        <div className="w-fit pr-4">
          <a href="#">Log in / Sign Up</a>
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
                  <button className="flex items-center gap-2 ">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    <p>{item.title}</p>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="flex-grow bg-gray-100 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
