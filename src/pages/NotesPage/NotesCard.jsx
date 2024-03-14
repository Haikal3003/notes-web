import React, { useState } from 'react';
import { BiDotsVertical, BiPin, BiXCircle, BiArchive, BiTrash, BiPencil } from 'react-icons/bi';
import { motion } from 'framer-motion';
import HTMLReactParser from 'html-react-parser';

const NotesCard = ({ id, title, body, date, onDeleteNote, onViewNote, onShowEditForm }) => {
  const [showNoteOption, setShowNoteOption] = useState(false);

  const handleShowNoteOption = () => {
    setShowNoteOption(!showNoteOption);
  };

  const handleShowEditForm = () => {
    onShowEditForm(id);
    setShowNoteOption(false);
  };

  const handleDeleteNote = () => {
    onDeleteNote(id);
  };

  return (
    <motion.div id="note-card" className="relative w-full max-w-full h-auto p-[20px] bg-white border-[2px] border-black rounded-md" initial={{ width: 0, opacity: 0 }} animate={{ width: '100%', opacity: 1 }}>
      <div className="flex justify-between items-center">
        <h1 id="note-title" className="text-[15px] font-semibold ">
          {title}
        </h1>

        <div className="flex items-center gap-1">
          <div id="note-option-button" className="flex justify-center items-center w-[25px] h-[25px] border-[2px] border-black rounded-md hover:bg-yellow-200 hover:scale-105 cursor-pointer">
            <BiPin />
          </div>
          <div id="note-option-button" className="flex justify-center items-center w-[25px] h-[25px] border-[2px] border-black rounded-md hover:bg-yellow-200 hover:scale-105 cursor-pointer" onClick={handleShowNoteOption}>
            {showNoteOption ? <BiXCircle /> : <BiDotsVertical />}
          </div>
        </div>
      </div>

      <div id="note-body" className="w-full h-[150px] overflow-hidden my-2">
        <div className="ql-editor w-full p-0 text-[12px]">{HTMLReactParser(body)}</div>
      </div>

      <div className="flex justify-between items-center">
        <div id="note-date">
          <p className="text-[10.5px] tracking-[1px] mt-2">{date}</p>
        </div>

        <div id="show-card">
          <p className=" text-[12px] cursor-pointer hover:text-yellow-400" onClick={() => onViewNote(id)}>
            See note
          </p>
        </div>
      </div>

      {showNoteOption && (
        <div id="modal-note-option" className="absolute flex flex-col justify-between w-[150px] h-[140px] top-[50px] right-[20px] bg-white border-[2px] border-black rounded-md p-2 gap-1">
          <div id="archive-button" className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-green-500 rounded-md hover:scale-105 cursor-pointer">
            <BiArchive />
            <span className="text-[10px] ml-1">Archive</span>
          </div>

          <div id="delete-button" className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-yellow-200 rounded-md hover:scale-105 cursor-pointer" onClick={() => handleShowEditForm(id)}>
            <BiPencil />
            <span className="text-[10px] ml-1">Edit</span>
          </div>

          <div id="delete-button" className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-red-500 rounded-md hover:scale-105 cursor-pointer" onClick={handleDeleteNote}>
            <BiTrash />
            <span className="text-[10px] ml-1">Delete</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NotesCard;
