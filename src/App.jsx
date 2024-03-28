import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import SideBar from './components/SideBar';
import PagesContainer from './components/PagesContainer';
import NotesPage from './pages/NotesPage/NotesPage';
import TrashPage from './pages/TrashPage/TrashPage';
import { v4 as uuid4 } from 'uuid';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [noteTrash, setNoteTrash] = useState(JSON.parse(localStorage.getItem('note-trash')) || []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('note-trash', JSON.stringify(noteTrash));
  }, [notes, noteTrash]);

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
  };

  const onDeleteNote = (id) => {
    const deletedNote = notes.find((note) => note.id === id);

    if (deletedNote) {
      const updatedNote = notes.filter((note) => note.id !== id);
      deletedNote.isTrash = true;

      setNotes(updatedNote);
      setNoteTrash([...noteTrash, deletedNote]);
    }
  };

  const onEditNote = (id, newTitle, newBody) => {
    const editNoteById = notes.map((note) => (note.id === id ? { ...note, title: newTitle, body: newBody } : note));
    setNotes(editNoteById);
  };

  return (
    <Router>
      <Container>
        <SideBar />
        <PagesContainer>
          <Routes>
            <Route path="/" exact element={<NotesPage onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} onEditNote={onEditNote} />} />
            <Route path="/trash" element={<TrashPage notes={notes} noteTrash={noteTrash} setNotes={setNotes} setNoteTrash={setNoteTrash} />} />
          </Routes>
        </PagesContainer>
      </Container>
    </Router>
  );
}

export default App;
