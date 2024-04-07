import Keyboard from "../components/Keyboard";

const User = ({isLoggedIn, setIsLoggedIn, isVisible, closeKeyboard, openKeyboard, keyColor, setKeyColor, editingTextEditor, setEditingTextEditor}) => {
  
  return (
    <div className="w-[100vw] h-[100vh] bg-black">
        <Keyboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isVisible={isVisible} closeKeyboard={closeKeyboard} keyColor={keyColor} editingTextEditor={editingTextEditor} setEditingTextEditor={setEditingTextEditor} />
    </div>
  );
}

export default User;