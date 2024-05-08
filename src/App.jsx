import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import SideBar from './components/SideBar';
import PagesContainer from './components/PagesContainer';
import NotesPage from './pages/NotesPage/NotesPage';
import TrashPage from './pages/TrashPage/TrashPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from 'react-hot-toast';
import { showToast } from './utils/toast';

function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [notesTrash, setNotesTrash] = useState(() => JSON.parse(localStorage.getItem('notes-trash')) || []);
  const [notesArchive, setNotesArchive] = useState(() => JSON.parse(localStorage.getItem('notes-archive')) || []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('note-trash', JSON.stringify(notesTrash));
    localStorage.setItem('note-archive', JSON.stringify(notesArchive));
  }, [notes, notesTrash, notesArchive]);

  const addNote = (title, body) => {
    const newNote = {
      id: uuidv4(),
      title,
      body,
      date: new Date().toLocaleDateString(),
      isArchive: false,
      isTrash: false,
    };

    showToast('Note added', '#000');
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    const deletedNote = notes.find((note) => note.id === id);

    if (deletedNote) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      deletedNote.isTrash = true;

      showToast('Note deleted (move to trash)', '#E72929');
      setNotes(updatedNotes);
      setNotesTrash((prevTrash) => [...prevTrash, deletedNote]);
    }
  };

  const editNote = (id, newTitle, newBody) => {
    const editedNotes = notes.map((note) => (note.id === id ? { ...note, title: newTitle, body: newBody } : note));

    showToast('Note edited ', '#FFC94A');
    setNotes(editedNotes);
  };

  const archiveNote = (id) => {
    const archivedNote = notes.find((note) => note.id === id);

    if (archivedNote) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      archivedNote.isArchive = true;

      showToast('Note archived ', '#713200');
      setNotes(updatedNotes);
      setNotesArchive((prevArchive) => [...prevArchive, archivedNote]);
    }
  };

  return (
    <Router>
      <Container>
        <SideBar />
        <PagesContainer>
          <Routes>
            <Route path="/" exact element={<NotesPage onAddNote={addNote} notes={notes} onDeleteNote={deleteNote} onEditNote={editNote} onArchiveNote={archiveNote} />} />
            <Route path="/trash" element={<TrashPage notes={notes} notesTrash={notesTrash} setNotes={setNotes} setNotesTrash={setNotesTrash} />} />
            <Route path="/archive" element={<ArchivePage notes={notes} notesArchive={notesArchive} setNotes={setNotes} setNotesArchive={setNotesArchive} />} />
          </Routes>
        </PagesContainer>
      </Container>

      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2500, style: { transitionDuration: '1s' } }} />
    </Router>
  );
}

export default App;
