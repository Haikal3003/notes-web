import React, { useState } from 'react';
import modulesEditor from '../../editor/moduleQuill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddForm = ({ handleAddNote, handleCloseAddForm }) => {
  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  return (
    <form id="add-form" className="fixed w-full max-w-[600px] h-[600px] bottom-[10px] right-[10px] bg-white rounded-md px-[20px] py-[45px] shadow-2xl z-50">
      <div id="title" className="mb-5">
        <input
          type="text"
          className="w-full p-3 text-[12px] outline-none bg-gray-100 rounded-md border-[2px] border-slate-300 font-bold"
          placeholder="Enter title note ..."
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
      </div>

      <div id="body" className=" flex flex-col mb-16">
        <div className="ql-container w-full bg-gray-100 h-[342px] ">
          <ReactQuill className=" w-full h-[300px] border border-slate-300" theme="snow" value={bodyValue} onChange={(value) => setBodyValue(value)} modules={modulesEditor} placeholder="Enter your description note..." />
        </div>
      </div>

      <div id="form-button" className="flex justify-between items-center">
        <div className="w-[120px] h-[45px] border-[1px] border-yellow-200 rounded-md text-center leading-[45px] font-semibold text-[13px] cursor-pointer" onClick={handleCloseAddForm}>
          Cancel
        </div>
        <div className="w-[120px] h-[45px] bg-yellow-200 rounded-md text-center leading-[45px] font-semibold text-[13px] cursor-pointer" onClick={() => handleAddNote(titleValue, bodyValue)}>
          Create
        </div>
      </div>
    </form>
  );
};

export default AddForm;
