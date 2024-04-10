import HTMLReactParser from 'html-react-parser';
import { truncatedText } from '../NotesPage/NotesCard';
import { motion } from 'framer-motion';
import { FaArrowRotateRight } from 'react-icons/fa6';

const ArchiveNoteCard = ({ id, title, body, date }) => {
  return (
    <div id="trash-note-card" className="relative w-full max-w-full h-auto p-[20px] bg-white border-[2px] border-black rounded-md">
      <div className="flex justify-between items-center">
        <h1 id="note-title" className="text-[15px] font-semibold w-full  overflow-x-hidden mr-4">
          {truncatedText(title)}
        </h1>
      </div>

      <div id="note-body" className="w-full h-[150px] overflow-hidden mt-2 my-4">
        <div className="ql-editor w-full p-0 text-[12px]">{HTMLReactParser(body)}</div>
      </div>

      <div className="flex justify-between items-center">
        <div id="note-date">
          <p className="text-[10.5px] tracking-[1px] mt-2">{date}</p>
        </div>

        <div className="flex text-[15px] gap-2">
          <motion.div id="restore-button" className="w-[40px] h-[40px] bg-yellow-200 leading-[40px] flex justify-center items-center rounded-md cursor-pointer hover:scale-105">
            <FaArrowRotateRight />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveNoteCard;
