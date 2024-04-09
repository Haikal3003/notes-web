import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import SideBar from './components/SideBar';
import PagesContainer from './components/PagesContainer';
import NotesPage from './pages/NotesPage/NotesPage';
import TrashPage from './pages/TrashPage/TrashPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuid4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [noteTrash, setNoteTrash] = useState(JSON.parse(localStorage.getItem('note-trash')) || []);
  const [noteArchive, setNoteArchive] = useState(JSON.parse(localStorage.getItem('note-archive')) || []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('note-trash', JSON.stringify(noteTrash));
    localStorage.setItem('note-archive', JSON.stringify(noteArchive));
  }, [notes, noteTrash, noteArchive]);

  const onAddNote = (titleValue, bodyValue) => {
    const newNote = {
      id: uuid4(),
      title: titleValue,
      body: bodyValue,
      date: new Date().toLocaleDateString(),
      isArchive: false,
      isTrash: false,
    };

    setNotes([...notes, newNote]);
    toast.success('Note added successfully', {
      style: {
        border: '2px solid #76885B',
        padding: '13px',
        color: '#76885B',
      },
      iconTheme: {
        primary: '#76885B',
        secondary: '#FFFAEE',
      },
    });
  };

  const onDeleteNote = (id) => {
    const deletedNote = notes.find((note) => note.id === id);

    if (deletedNote) {
      const updatedNote = notes.filter((note) => note.id !== id);
      deletedNote.isTrash = true;

      setNotes(updatedNote);
      setNoteTrash([...noteTrash, deletedNote]);
      toast.success('Note deleted successfully', {
        style: {
          border: '2px solid #E72929',
          padding: '13px',
          color: '#E72929',
        },
        iconTheme: {
          primary: '#E72929',
          secondary: '#FFFAEE',
        },
      });
    }
  };

  const onEditNote = (id, newTitle, newBody) => {
    const editNoteById = notes.map((note) => (note.id === id ? { ...note, title: newTitle, body: newBody } : note));
    setNotes(editNoteById);
    toast.success('Note edited successfully', {
      style: {
        border: '2px solid #FFC94A',
        padding: '13px',
        color: '#FFC94A',
      },
      iconTheme: {
        primary: '#FFC94A',
        secondary: '#FFFAEE',
      },
    });
  };

  const onArchiveNote = (id) => {
    const archivedNote = notes.find((note) => note.id === id);

    if (archivedNote) {
      const updatedNote = notes.filter((note) => note.id !== id);
      archivedNote.isArchive = true;

      setNotes(updatedNote);
      setNoteArchive([...noteArchive, archivedNote]);
      toast.success('Note archive successfully!', {
        style: {
          border: '2px solid #713200',
          padding: '13px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
  };

  return (
    <Router>
      <Container>
        <SideBar />
        <PagesContainer>
          <Routes>
            <Route path="/" exact element={<NotesPage onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} onEditNote={onEditNote} onArchiveNote={onArchiveNote} />} />
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
