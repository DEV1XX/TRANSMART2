import React, { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import SideBarSlice from '../Slices/SideBarSlice'
import { toggleSideBar } from '../Slices/SideBarSlice'; 
import {useDispatch, useSelector} from 'react-redux';

const NavBar = () => {
  const isOpen = useSelector((state) => state.sidebar.isSideBarOpen);
  const dispatch = useDispatch();

    const [isDarkMode, setIsDarkMode] = useState(() => {
      return localStorage.getItem("darkMode") === "true";
    });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-between p-[2vh] pl-[3vh] pr-[5vh] md:pl-[5vh] md:pr-[20vh] transition dark:bg-slate-900 dark:text-white align-middle shadow-md dark:shadow-md border-b-1 border-gray-100">
      <div className="flex">
        <div className="hover:scale-110 bg-slate-400 dark:bg-slate-700 h-[40px] w-[40px] hidden md:block rounded-full flex justify-center items-center p-2">
          <button onClick={() => {
            console.log("Menu button clicked!"); // Debugging log
            dispatch(toggleSideBar()); // Ensure function is being called
          }}>
            {isOpen ? <MenuOpenIcon sx={{ color: "white" }} /> : <MenuIcon sx={{ color: "white" }} />}
          </button>
        </div>
        <div className="text-2xl md:text-2xl pt-2 ml-5">TRANSMART</div>
      </div>
      <div className="rounded-full bg-slate-300 h-[40px] w-[40px] flex justify-center dark:bg-slate-700 hover:scale-110">
        <button onClick={toggleTheme}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
