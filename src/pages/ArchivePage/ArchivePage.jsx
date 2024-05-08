import { showToast } from '../../utils/toast';
import ArchiveNoteCard from '../ArchivePage/ArchiveNoteCard';

const ArchivePage = ({ notes, notesArchive, setNotes, setNotesArchive }) => {
  const onRestoreNote = (id) => {
    const restoredNote = notesArchive.find((note) => note.id === id);

    if (restoredNote) {
      const updatedNote = notesArchive.filter((note) => note.id !== id);
      restoredNote.isArchive = false;

      setNotesArchive(updatedNote);
      setNotes([...notes, restoredNote]);
      showToast('Note restored', '#000');
    }
  };

  return (
    <div className="relative py-3 w-full">
      <h1 className="Heading text-[35px] font-bold">Archive</h1>

      {notesArchive.length === 0 ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Notes is Empty</div>
      ) : (
        <div className="relative w-full h-full my-[20px] grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {notesArchive.map((note) => {
            return <ArchiveNoteCard key={note.id} id={note.id} title={note.title} body={note.body} date={note.date} onRestoreNote={onRestoreNote} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
