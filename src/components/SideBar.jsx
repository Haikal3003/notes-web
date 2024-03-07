import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt, BiNote, BiArchive, BiTrashAlt } from 'react-icons/bi';
import { FaMoon, FaSun } from 'react-icons/fa';

const SideBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onDarkMode = () => {
    setIsDarkMode((darkMode) => !darkMode);
  };

  const links = [
    { to: '/', icon: <BiNote /> },
    { to: '/archive', icon: <BiArchive /> },
    { to: '/trash', icon: <BiTrashAlt /> },
  ];

  return (
    <div id="side-bar" className="fixed w-[100px] flex flex-col justify-between  items-center h-full top-0 left-0 bg-white  py-10 shadow-md ">
      <div id="logo" className="relative w-[40px] h-[40px] leading-[40px] text-center bg-slate-900 text-white rounded-[6px]">
        <h1 className="text-[16px] font-bold">N.</h1>
      </div>

      <ul id="nav-list">
        {links.map((link) => (
          <li className="mb-6">
            <Link to={link.to} className="relative flex justify-center items-center  w-[40px] h-[40px] border-[2px] border-solid border-black rounded-[6px] hover:bg-yellow-200 hover:scale-105">
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>

      <div id="dark-mode-button" className="relative flex justify-center items-center  w-[40px] h-[40px] border-[2px] border-solid border-black rounded-[6px] hover:bg-yellow-200 hover:scale-105 cursor-pointer" onClick={onDarkMode}>
        {isDarkMode ? <FaMoon /> : <FaSun />}
      </div>
    </div>
  );
};

export default SideBar;
