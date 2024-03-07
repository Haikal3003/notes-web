import React, { useState } from 'react';
import { BiDotsVertical, BiPin, BiXCircle, BiArchive, BiTrash } from 'react-icons/bi';

const NotesCard = ({ id, title, body, date, onDeleteNote }) => {
  const [showNoteOption, setShowNoteOption] = useState(false);

  const handleShowNoteOption = () => {
    setShowNoteOption(!showNoteOption);
  };

  const handleDeleteNote = () => {
    onDeleteNote(id);
  };

  return (
    <div id="note-card" className="relative w-full h-auto p-[20px] bg-white border-[2px] border-black rounded-md ">
      <div className="flex justify-between items-center mb-2">
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

      <div id="note-body" className="w-full min-h-[150px]">
        <p className="text-[12px]">{body}</p>
      </div>

      <div id="note-date">
        <p className="text-[10.5px] tracking-[1px] mt-2">{date}</p>
      </div>

      {showNoteOption && (
        <div id="modal-note-option" className="absolute flex flex-col justify-between w-[150px] h-[110px] top-[50px] right-[20px] bg-white border-[2px] border-black rounded-md p-2">
          <div id="archive-button" className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-green-500 rounded-md hover:scale-105 cursor-pointer">
            <BiArchive />
            <span className="text-[10px] ml-1">Archive</span>
          </div>
          <div id="delete-button" className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-red-500 rounded-md hover:scale-105 cursor-pointer" onClick={handleDeleteNote}>
            <BiTrash />
            <span className="text-[10px] ml-1">Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesCard;
