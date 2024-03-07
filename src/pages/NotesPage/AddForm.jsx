import React, { useState } from 'react';

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

      <div id="body" className="flex flex-col mb-6">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-full min-h-[340px] p-3 bg-gray-100 text-[12px] outline-none rounded-md border-[2px] border-slate-300 resize-none"
          placeholder="Enter your note..."
          value={bodyValue}
          onChange={(e) => setBodyValue(e.target.value)}
        ></textarea>
      </div>

      <div id="form-button" className="flex justify-between items-center">
        <div className="w-[120px] h-[45px] border-[1px] border-yellow-200 rounded-md text-center leading-[45px] font-semibold text-[13px] cursor-pointer" onClick={handleCloseAddForm}>
          Cancel
        </div>
        <div className="w-[120px] h-[45px] bg-yellow-200 rounded-md text-center leading-[45px] font-semibold text-[13px] cursor-pointer " onClick={() => handleAddNote(titleValue, bodyValue)}>
          Create
        </div>
      </div>
    </form>
  );
};

export default AddForm;
