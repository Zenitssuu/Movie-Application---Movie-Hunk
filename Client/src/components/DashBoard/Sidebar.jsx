import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { RiSettingsLine } from "react-icons/ri";
import { BsArrowRightCircle } from "react-icons/bs";
import { DASHBOARD_SIDEBAR_LINKS } from "./navigation";
import { Link, useLocation } from "react-router-dom";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-gray-700 hover:no-underline active:bg-gray-800 rounded-md text-base transition-colors duration-200";

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "bg-gray-800 text-white" : "text-gray-400",
        linkClass
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

const Sidebar = () => {
  const [open, setOpen] = useState(window.innerWidth > 1007);

  const handleResize = () => {
    setOpen(window.innerWidth > 1007);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`bg-gray-900 flex flex-col text-white ${open ? "w-60" : "w-0"} ${open ? "p-3" : "p-0"} duration-300`}
      style={{ marginTop: "64px" }}  // Adjust this margin to prevent overlapping with the header
    >
      <BsArrowRightCircle
        className={`text-2xl text-gray-300 bg-gray-800 rounded-full absolute -right-3 top-8 cursor-pointer ${open ? "rotate-180" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      />
      <Link
        to='/'
        className={`flex items-center gap-2 px-1 py-3 hover:no-underline duration-300 ${!open && "scale-0"}`}
      >
        <RiSettingsLine fontSize={24} className='text-white' />
        <span className={`text-gray-200 text-lg font-bold`}>Dashboard</span>
      </Link>
      <div className={`flex-1 py-8 flex flex-col gap-2 duration-300 ${!open && "scale-0"}`}>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
