import React, { useState } from 'react';

const TextEditor = ({textData}) => {
  const [text, setText] = useState('');

  // Function to save text to local storage
  const saveText = () => {
    localStorage.setItem('savedText', text);
    alert('Text saved successfully!');
  }

  // Function to load text from local storage
  const loadText = () => {
    const loadedText = localStorage.getItem('savedText');
    if (loadedText !== null) {
      setText(loadedText);
      alert('Text loaded successfully!');
    } else {
      alert('No saved text found.');
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-black">
      <p className="text-white">Text Editor</p>
      <textarea 
        value={textData} 
        onChange={(e) => setText(e.target.value)} 
        className="w-[95%] h-[90%] p-2 resize-none border-2 border-white rounded-lg mb-3"
      />
      <div className=" w-full h-[50px] flex flex-row justify-center">
        <button onClick={saveText} className="bg-[#19A957] hover:bg-[#2AF980] rounded-md h-[50px] w-[100px] text-white mr-4 sm:w-[175px] md:w-[225px] lg:w-[350px]">
          Save
        </button>
        <button onClick={loadText} className="bg-[#19A957] hover:bg-[#2AF980] rounded-md h-[50px] w-[100px] text-white sm:w-[175px] md:w-[225px] lg:w-[350px]">
          Load
        </button>
      </div>
    </div>
  );
}

export default TextEditor;
