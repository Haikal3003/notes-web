import ArchiveNoteCard from '../ArchivePage/ArchiveNoteCard';

const ArchivePage = ({ notes, noteArchive, setNotes, setNoteArchive }) => {
  return (
    <div className="relative py-3 w-full">
      <h1 className="Heading text-[35px] font-bold">Archive</h1>

      {noteArchive.length === 0 ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Notes is Empty</div>
      ) : (
        <div className="relative w-full h-full my-[20px] grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {noteArchive.map((note) => {
            return <ArchiveNoteCard key={note.id} id={note.id} title={note.title} body={note.body} date={note.date} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
