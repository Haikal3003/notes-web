import React, { useState } from 'react';
import TrashNoteCard from './TrashNoteCard';
import { showToast } from '../../utils/toast';

const TrashPage = ({ notes, notesTrash, setNotes, setNotesTrash }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleShowDeletePopUp = (id) => setSelectedNote(notesTrash.find((note) => note.id === id));
  const handleCloseDeletePopUp = () => setSelectedNote(null);

  const onDeleteNotePermanently = (id) => {
    const updatedNoteTrash = notesTrash.filter((note) => note.id !== id);
    setNotesTrash(updatedNoteTrash);
    handleCloseDeletePopUp();

    showToast('Note delete permanently', '#E72929');
  };

  const onRestoreNote = (id) => {
    const restoredNote = notesTrash.find((note) => note.id === id);
    if (restoredNote) {
      const updatedNote = notesTrash.filter((note) => note.id !== id);
      restoredNote.isTrash = false;
      setNotesTrash(updatedNote);
      setNotes([...notes, restoredNote]);
      showToast('Note restored successfully!', '#000');
    }
  };

  return (
    <div className="relative py-3 w-full">
      <h1 className="Heading text-[35px] font-bold">Trash Note</h1>
      {notesTrash.length === 0 ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Notes is Empty</div>
      ) : (
        <div className="relative w-full h-full my-[20px] grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {notesTrash.map((note) => (
            <TrashNoteCard key={note.id} id={note.id} title={note.title} body={note.body} date={note.date} handleShowDeletePopUp={handleShowDeletePopUp} onRestoreNote={onRestoreNote} />
          ))}
        </div>
      )}
      {selectedNote && (
        <div id="delete-popup" className="fixed top-0 left-0 w-full h-full z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-[60%] h-auto bg-white rounded-md text-center">
            <h1 id="heading" className="mb-4">
              Delete Permanently ?
            </h1>
            <div className="flex justify-center items-center gap-4 ">
              <button id="cancel-button" className="w-[200px] h-[40px] bg-gray-400 rounded-md text-[12px] text-white" onClick={handleCloseDeletePopUp}>
                Cancel
              </button>
              <button id="delete-button" className="w-[200px] h-[40px] bg-red-500 rounded-md text-[12px] text-white" onClick={() => onDeleteNotePermanently(selectedNote.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashPage;
