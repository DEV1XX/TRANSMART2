import React, { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../Slices/SideBarSlice';

const NavBar = () => {
  const isOpen = useSelector((state) => state.sidebar.isSideBarOpen);
  const dispatch = useDispatch();
  
  // Get user data from Redux store
  const { isLoggedIn, name, user } = useSelector((state) => state.auth);
  const profileImageUrl = localStorage.getItem("profileImageUrl") || null;
  
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

  // Get first letter of name for avatar fallback
  const getInitial = () => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "U";
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
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-300 h-[40px] w-[40px] flex justify-center items-center dark:bg-slate-700 hover:scale-110">
          <button onClick={toggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>
        
        {isLoggedIn && (
          <div className="rounded-full h-[40px] w-[40px] flex justify-center items-center overflow-hidden">
            {profileImageUrl ? (
              <img 
                src={profileImageUrl} 
                alt="User profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-blue-500 text-white h-full w-full flex justify-center items-center font-semibold">
                {getInitial()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;