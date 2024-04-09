import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import SideBar from './components/SideBar';
import PagesContainer from './components/PagesContainer';
import NotesPage from './pages/NotesPage/NotesPage';
import TrashPage from './pages/TrashPage/TrashPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export const showToast = (message, color) => {
  toast.success(message, {
    style: {
      border: `2px solid ${color}`,
      padding: '13px',
      fontSize: '13px',
      color: color,
    },
    iconTheme: {
      primary: color,
      secondary: '#FFFAEE',
    },
  });
};

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [noteTrash, setNoteTrash] = useState(() => JSON.parse(localStorage.getItem('note-trash')) || []);
  const [noteArchive, setNoteArchive] = useState(() => JSON.parse(localStorage.getItem('note-archive')) || []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('note-trash', JSON.stringify(noteTrash));
    localStorage.setItem('note-archive', JSON.stringify(noteArchive));
  }, [notes, noteTrash, noteArchive]);

  const addNote = (title, body) => {
    const newNote = {
      id: uuidv4(),
      title,
      body,
      date: new Date().toLocaleDateString(),
      isArchive: false,
      isTrash: false,
    };

    showToast('Note added successfully', '#76885B');
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    const deletedNote = notes.find((note) => note.id === id);

    if (deletedNote) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      deletedNote.isTrash = true;

      showToast('Note deleted successfully', '#E72929');
      setNotes(updatedNotes);
      setNoteTrash((prevTrash) => [...prevTrash, deletedNote]);
    }
  };

  const editNote = (id, newTitle, newBody) => {
    const editedNotes = notes.map((note) => (note.id === id ? { ...note, title: newTitle, body: newBody } : note));

    showToast('Note edited successfully', '#FFC94A');
    setNotes(editedNotes);
  };

  const archiveNote = (id) => {
    const archivedNote = notes.find((note) => note.id === id);

    if (archivedNote) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      archivedNote.isArchive = true;

      showToast('Note archived successfully', '#713200');
      setNotes(updatedNotes);
      setNoteArchive((prevArchive) => [...prevArchive, archivedNote]);
    }
  };

  return (
    <Router>
      <Container>
        <SideBar />
        <PagesContainer>
          <Routes>
            <Route path="/" exact element={<NotesPage onAddNote={addNote} notes={notes} onDeleteNote={deleteNote} onEditNote={editNote} onArchiveNote={archiveNote} />} />
            <Route path="/trash" element={<TrashPage notes={notes} noteTrash={noteTrash} setNotes={setNotes} setNoteTrash={setNoteTrash} />} />
            <Route path="/archive" element={<ArchivePage notes={notes} noteArchive={noteArchive} setNotes={setNotes} setNoteArchive={setNoteArchive} />} />
          </Routes>
        </PagesContainer>
      </Container>

      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2500, style: { transitionDuration: '1s' } }} />
    </Router>
  );
}

export default App;
