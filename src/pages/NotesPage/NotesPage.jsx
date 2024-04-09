import React, { useEffect, useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import AddForm from './AddForm';
import NotesCard from './NotesCard';
import EditForm from './EditForm';
import HTMLReactParser from 'html-react-parser';

const NotesPage = ({ notes, onAddNote, onDeleteNote, onEditNote, onArchiveNote }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEditNote, setSelectedEditNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleShowEditForm = (id) => {
    const showEditFormById = notes.find((note) => note.id === id);
    setSelectedEditNote(showEditFormById);
  };

  const handleCloseEditForm = () => setSelectedEditNote(null);

  const onViewNote = (id) => {
    const viewById = notes.find((note) => note.id === id);
    setSelectedNote(viewById);
  };

  const handleCloseNote = () => setSelectedNote(null);

  const handleAddNote = (title, body) => {
    if (title.trim() === '' || body.trim() === '') {
      return;
    }

    onAddNote(title, body);
    setShowAddForm(false);
  };

  const handleSearch = () => {
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));

    setSearchQuery('');
    setSearchResult(filteredNotes);
  };

  return (
    <div className="relative">
      <div id="header" className="flex justify-between items-center py-3 border-b-[1px] border-black max-sm:flex-wrap max-sm:w-full gap-2">
        <div className="relative flex justify-between items-center w-full max-w-[350px] max-sm:max-w-full  h-[45px]  px-4 border-[2px] border-solid border-black rounded-md">
          <input
            id="search-input"
            type="text"
            className="border-none outline-none w-full text-gray-800 text-[12px] bg-transparent font-poppins"
            placeholder="Search your note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="text-[14px] cursor-pointer hover:text-yellow-300" onClick={handleSearch} />
        </div>

        <div className="relative w-full  flex items-center justify-end max-sm:gap-3 max-sm:justify-between">
          <div className="max-sm:w-full">
            <select name="" id="" className="outline-none w-[120px] h-[45px] text-center text-[12px] border-[2px] border-solid border-black rounded-md cursor-pointer mr-4 max-sm:w-full">
              <option value="latest">Latest</option>
              <option value="1 week">1 Week</option>
            </select>
          </div>

          <div
            id="add-note-button"
            className="flex justify-center items-center text-[13px] w-[120px] h-[45px] bg-yellow-200 border-[2px] border-solid border-black rounded-md cursor-pointer hover:scale-105 max-sm:w-full"
            onClick={handleShowAddForm}
          >
            <FaPlus />
          </div>
        </div>
      </div>

      {showAddForm && <AddForm handleAddNote={handleAddNote} handleCloseAddForm={handleCloseAddForm} />}
      {selectedEditNote && <EditForm note={selectedEditNote} handleCloseEditForm={handleCloseEditForm} onEditNote={onEditNote} />}

      {notes.length === 0 ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Notes is Empty</div>
      ) : (
        <div id="note-card-container" className="relative w-full my-[20px] grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {(searchResult.length > 0 ? searchResult : notes).map((note) => (
            <NotesCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              date={note.date}
              onDeleteNote={onDeleteNote}
              onViewNote={onViewNote}
              onShowEditForm={handleShowEditForm}
              selectedNote={selectedNote}
              onArchiveNote={onArchiveNote}
            />
          ))}
        </div>
      )}

      {selectedNote && (
        <div id="note-view" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-auto p-[20px] bg-white border-[2px] border-black rounded-md">
          <h1 className="font-bold mb-2">{selectedNote.title}</h1>
          <p className="ql-editor text-[12px] pb-[50px] px-0">{HTMLReactParser(selectedNote.body)}</p>
          <div className="text-[12px] w-[100px] text-center py-3 rounded-md font-medium  bg-yellow-200 cursor-pointer" onClick={handleCloseNote}>
            Close
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
