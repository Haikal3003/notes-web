import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiNote, BiArchive, BiTrashAlt, BiMenu, BiX } from 'react-icons/bi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SideBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onDarkMode = () => {
    setIsDarkMode((darkMode) => !darkMode);
  };

  const links = [
    { to: '/', icon: <BiNote />, text: 'Notes' },
    { to: '/archive', icon: <BiArchive />, text: 'Archive' },
    { to: '/trash', icon: <BiTrashAlt />, text: 'Trash' },
  ];

  return (
    <div id="side-bar" className="fixed w-[100px] flex flex-col justify-between  items-center h-full top-0 left-0 bg-white py-10 shadow-md max-sm:relative max-sm:w-full  max-sm:flex-row max-sm:px-4 max-sm:py-4  ">
      <div id="logo" className="relative w-[40px] h-[40px] leading-[40px] text-center bg-slate-900 text-white rounded-[6px]">
        <h1 className="text-[16px] font-bold">N.</h1>
      </div>

      <ul id="nav-list" className={isMenuOpen ? 'max-sm:fixed max-sm:w-full max-sm:h-full max-sm:left-0 max-sm:top-0 max-sm:bg-white z-[1000] max-sm:px-[20px] max-sm:py-[150px] ' : 'max-sm:hidden'}>
        {links.map((link, index) => (
          <li key={index} className="mb-6 max-sm:mb-2" onClick={() => setIsMenuOpen(false)}>
            <Link
              to={link.to}
              className={
                isMenuOpen
                  ? 'relative flex justify-center items-center w-full h-[40px] text-[17px] font-bold hover:text-yellow-400  '
                  : 'relative flex justify-center items-center  w-[40px] h-[40px] border-[2px] border-solid border-black rounded-[6px] hover:bg-yellow-200 hover:scale-105 '
              }
            >
              {isMenuOpen ? link.text : link.icon}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <div id="dark-mode-button" className="relative flex justify-center items-center  w-[40px] h-[40px] border-[2px] border-solid border-black rounded-[6px] hover:bg-yellow-200 hover:scale-105 cursor-pointer" onClick={onDarkMode}>
          {isDarkMode ? <FaMoon /> : <FaSun />}
        </div>

        <div
          id="menu-button"
          className="relative hidden justify-center items-center w-[40px] h-[40px] border-[2px] border-solid border-black rounded-md hover:scale-105 cursor-pointer text-[20px]  max-sm:flex z-[1500]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? <BiMenu /> : <BiX />}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
