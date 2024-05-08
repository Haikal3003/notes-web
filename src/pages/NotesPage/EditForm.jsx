import React, { useState } from 'react';
import modulesEditor from '../../data/moduleQuill';
import ReactQuill from 'react-quill';

const EditForm = ({ note, handleCloseEditForm, onEditNote }) => {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newBody, setNewBody] = useState(note.body);

  const handleSaveEditedNote = () => {
    onEditNote(note.id, newTitle, newBody);
    handleCloseEditForm();
  };

  return (
    <form id="edit-form" className="fixed w-full max-w-[600px] h-auto top-[5px] right-[10px] bg-white rounded-md px-[20px] py-[45px] shadow-2xl z-50 max-sm:max-w-full max-sm:h-full max-sm:bottom-0 max-sm:right-0 max-sm:py-[100px]">
      <h1 id="heading" className="text-[20px] font-bold mb-5">
        Edit note...
      </h1>
      <div id="title" className="mb-5">
        <input type="text" className="w-full p-3 text-[12px] outline-none bg-gray-100 rounded-md border-[2px] border-slate-300 font-bold" placeholder="Enter title note ..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </div>

      <div id="body" className="flex flex-col mb-6">
        <div className="ql-container w-full bg-gray-100 h-[342px] ">
          <ReactQuill className=" w-full h-[300px] border border-slate-300" theme="snow" value={newBody} onChange={(value) => setNewBody(value)} modules={modulesEditor} placeholder="Enter your description note..." />
        </div>
      </div>

      <div id="form-button" className="flex justify-between items-center">
        <div className="w-[120px] h-[45px] border-[1px] border-yellow-200 rounded-md text-center leading-[45px] font-semibold text-[13px] cursor-pointer" onClick={handleCloseEditForm}>
          Cancel
        </div>
        <div className="w-[120px] h-[45px] bg-yellow-200 rounded-md text-center leading-[45px] font-semibold text-[13px] cursor-pointer " onClick={handleSaveEditedNote}>
          Save
        </div>
      </div>
    </form>
  );
};

export default EditForm;
