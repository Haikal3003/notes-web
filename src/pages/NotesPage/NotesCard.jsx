import React, { useEffect, useState } from 'react';
import { BiDotsVertical, BiPin, BiXCircle, BiArchive, BiTrash, BiPencil } from 'react-icons/bi';
import HTMLReactParser from 'html-react-parser';
import { truncatedText } from '../../utils/truncatedText';
import { motion } from 'framer-motion';

const NotesCard = ({ id, title, body, date, onDeleteNote, onViewNote, onShowEditForm, selectedNote, onArchiveNote }) => {
  const [showNoteOption, setShowNoteOption] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setShowNoteOption(false);
    }
  }, [selectedNote]);

  const handleShowEditForm = () => {
    onShowEditForm(id);
    setShowNoteOption(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div id="note-card" className="relative w-full max-w-full h-auto p-[20px] bg-white border-[2px] border-black rounded-md" variants={cardVariants} initial="hidden" animate="visible">
      <div className="flex justify-between items-center">
        <h1 id="note-title" className="text-[15px] font-semibold w-full  overflow-x-hidden mr-4">
          {truncatedText(title)}
        </h1>
        <div className="flex items-center gap-1">
          <div className="flex justify-center items-center w-[25px] h-[25px] border-[2px] border-black rounded-md hover:bg-yellow-200 hover:scale-105 cursor-pointer">
            <BiPin />
          </div>
          <div className="flex justify-center items-center w-[25px] h-[25px] border-[2px] border-black rounded-md hover:bg-yellow-200 hover:scale-105 cursor-pointer" onClick={() => setShowNoteOption(!showNoteOption)}>
            {showNoteOption ? <BiXCircle /> : <BiDotsVertical />}
          </div>
        </div>
      </div>

      <div id="note-body" className="w-full h-[150px] overflow-hidden mt-2 my-4">
        <div className="ql-editor w-full p-0 text-[12px]">{HTMLReactParser(body)}</div>
      </div>
      <div className="flex justify-between items-center">
        <div id="note-date">
          <p className="text-[10.5px] tracking-[1px] mt-2">{date}</p>
        </div>
        <div id="show-card">
          <p className="text-[12px] cursor-pointer hover:text-yellow-400" onClick={() => onViewNote(id)}>
            See note
          </p>
        </div>
      </div>

      {showNoteOption && (
        <div id="modal-note-option" className="absolute flex flex-col justify-between w-[150px] h-[140px] top-[50px] right-[20px] bg-white border-[2px] border-black rounded-md p-2 gap-1">
          <div className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-green-500 rounded-md hover:scale-105 cursor-pointer" onClick={() => onArchiveNote(id)}>
            <BiArchive />
            <span className="text-[10px] ml-1">Archive</span>
          </div>
          <div className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-yellow-200 rounded-md hover:scale-105 cursor-pointer" onClick={() => handleShowEditForm(id)}>
            <BiPencil />
            <span className="text-[10px] ml-1">Edit</span>
          </div>
          <div className="w-full h-[40px] flex justify-center items-center border-[2px] border-black bg-red-500 rounded-md hover:scale-105 cursor-pointer" onClick={() => onDeleteNote(id)}>
            <BiTrash />
            <span className="text-[10px] ml-1">Delete</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NotesCard;
