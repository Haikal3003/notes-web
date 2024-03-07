import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import AddForm from './AddForm';
import NotesCard from './NotesCard';

const NotesPage = ({ notes, onAddNote, onDeleteNote }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddNote = (title, body) => {
    if (title.trim() === '' || body.trim() === '') {
      return;
    }

    if (body > 10) {
      console.log('Yang bener');
    }

    onAddNote(title, body);
    setShowAddForm(false);
  };

  return (
    <div className="relative">
      <div id="header" className="flex justify-between items-center py-3 border-b-[1px] border-black">
        <div className="relative flex justify-between items-center w-full max-w-[350px]  h-[45px]  px-4 border-[2px] border-solid border-black rounded-full">
          <input id="search-input" type="text" className="border-none outline-none w-full text-gray-800 text-[12px] bg-transparent font-poppins" placeholder="Search your note..." />
          <FaSearch className="text-[14px] cursor-pointer hover:text-yellow-300" />
        </div>

        <div className="flex items-center">
          <div>
            <select name="" id="" className="outline-none w-[120px] h-[45px] text-center text-[12px] border-[2px] border-solid border-black rounded-md cursor-pointer mr-4">
              <option value="latest">Latest</option>
              <option value="1 week">1 Week</option>
            </select>
          </div>

          <div id="add-note-button" className="flex justify-center items-center text-[13px] w-[120px] h-[45px] bg-yellow-200 border-[2px] border-solid border-black rounded-md cursor-pointer hover:scale-105" onClick={handleShowAddForm}>
            <FaPlus />
          </div>
        </div>
      </div>

      {showAddForm && <AddForm handleAddNote={handleAddNote} handleCloseAddForm={handleCloseAddForm} />}
      <div id="note-card-container" className="relative w-full my-[20px] grid grid-cols-3 gap-3">
        {notes.map((note) => {
          return <NotesCard key={note.id} id={note.id} title={note.title} body={note.body} date={note.date} onDeleteNote={onDeleteNote} />;
        })}
      </div>
    </div>
  );
};

export default NotesPage;
