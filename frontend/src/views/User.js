import Keyboard from "../components/Keyboard";
import { useEffect } from "react";

const User = ({isLoggedIn, setIsLoggedIn, isVisible, closeKeyboard, openKeyboard, keyColor, setKeyColor, editingTextEditor, setEditingTextEditor}) => {
  
  return (
    <div className="w-[100vw] h-[100vh] bg-[#1B2C3E] flex flex-col justify-center items-center">
        {!isVisible && (
          <button onClick={openKeyboard} className="w-40 h-40 rounded-md bg-[#19A957] hover:bg-[#2AF980] text-white">Open Keyboard</button>
        )}
        <Keyboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isVisible={isVisible} closeKeyboard={closeKeyboard} keyColor={keyColor} setKeyColor={setKeyColor} editingTextEditor={editingTextEditor} setEditingTextEditor={setEditingTextEditor} />
    </div>
  );
}

export default User;