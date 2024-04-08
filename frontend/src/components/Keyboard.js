import React, { useState, useEffect } from "react";
import TextEditor from "./Text-Editor";
import FormFieldEditor from "./Form-Field-Editor";
import { useNavigate } from 'react-router-dom';


const Keyboard = ({ isLoggedIn, setIsLoggedIn, isVisible, closeKeyboard, handleUsernameChangeLogin, handlePasswordChangeLogin, handleUsernameChangeReg, handlePasswordChangeReg, handleConfirmPasswordChangeReg, activeFieldLogin, activeFieldReg, keyColor, editingTextEditor, setEditingTextEditor }) => {

    const [mainSuperkeyVisibility, setMainSuperkeyVisibility] = useState(true); // State to track whether all the zoomed out superkeys are visible
    const [zoomedSuperkeyVisibility, setZoomedSuperkeyVisibility] = useState([false, false, false, false, false, false, false]); // State to track whether each of the zoomed in individual superkeys are visible
    const [wordBarVisibility, setWordBarVisibility] = useState(true); // State to track whether the word predication bar is visible
    const [numberVisibility, setNumberVisibility] = useState(false); // State to track whether the zoomed in number selection is visible
    const [symbolVisibility, setSymbolVisibility] = useState([false, false, false, false]); // State to track whether the zoomed in symbol selections are visible
    const [capsLock, setCapsLock] = useState(false); // State to track whether the caps lock key is engaged
    const [shiftState, setShiftState] = useState(false); // State to track whether the shift key is engaged
    const [loginData, setLoginData] = useState(['', '']); // State to keep track of what is written in the active login text field
    const [regData, setRegData] = useState(['', '', '']); // State to keep track of what is written in the active register text field
    const [textData, setTextData] = useState(['']); // State to keep track of what is written in the text editor
    const [capsLockColour, setCapsLockColour] = useState('#19A957'); // State to supply the colour for the caps lock key
    const [shiftColour, setShiftColour] = useState('#19A957'); // State to supply the colour for the shift key
    const [shortcutsVisible, setShortcutsVisible] = useState(false); // State to track whether the saved shortcuts are visible
    const [letterState, setLetterState] = useState(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']); // State to supply the letters for the keys
    const [shortcutData, setShortcutData] = useState(['', '', '', '', '']); // State to store the 5 shortcuts that are loaded from the backend
    const [currentWord, setCurrentWord] = useState('');
    const [predictions, setPredictions] = useState(['Word 1', 'Word 2', 'Wor 3', 'Word 4']);

    useEffect(() => {
        //loadShortcuts(); // Load shortcuts from the backend when the component loads
    }, []);

    // Set unknown object's fields to false to make room for the active fields
    if (!activeFieldLogin) { // If the activeFieldLogin object does not exist pre-set it's fields to false
        activeFieldLogin = [false, false];
    }
    if (!activeFieldReg) { // If the activeFieldReg object does not exist pre-set it's fields to false
        activeFieldReg = [false, false, false];
    }

    const navigate = useNavigate(); // Used to navigate through the website

    // Function to toggle the visibility of all the zoomed out superkeys
    const toggleMainSuperkeyVisibility = () => {
        setMainSuperkeyVisibility(!mainSuperkeyVisibility);
    };

    // Function to toggle the visibility of each of the zoomed in individual superkeys
    const toggleZoomedSuperkeyVisibility = (keyNumber) => {
        setZoomedSuperkeyVisibility(prevVisibility => (
            prevVisibility.map((visibility, index) => index === keyNumber ? !visibility : visibility)
        ));
    };

    // Function to toggle the visibility of the word predication bar
    const toggleWordBarVisibility = () => {
        setWordBarVisibility(!wordBarVisibility);
    };

    // Function to toggle the visibility of the zoomed in number selection
    const toggleNumberVisibility = () => {
        setNumberVisibility(!numberVisibility);
    };

    // Function to toggle the visibility of the zoomed in symbol selections
    const toggleSymbolVisibility = (index) => {
        if (index === 5) { // If the index is 5 reset to signify that the symbols are not zoomed in
            const newArray = [false, false, false, false];
            setSymbolVisibility(newArray);
        } else { // Otherwise zoom in at the specified index
            const newArray = [false, false, false, false];
            newArray[index] = !newArray[index];
            setSymbolVisibility(newArray);
        }
    };

    // Function to toggle the caps lock on and off
    const toggleCapsLock = () => {
        setCapsLock(!capsLock);
        if (!capsLock) {
            const newCapsLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
            setLetterState(newCapsLetters);
        } else {
            const newLowerCaseLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
            setLetterState(newLowerCaseLetters);
        }
        if (capsLockColour === '#19A957') {
            setCapsLockColour('#0F6834') // colour of the caps lock key when it is engaged
        } else {
            setCapsLockColour('#19A957'); // defalt colour of the caps lock key for when it is dis-engaged
        }
    }

    // Function to toggle shift on and off
    const toggleShift = () => {
        setShiftState(!shiftState);
        if (shiftColour === '#19A957') {
            setShiftColour('#0F6834') // colour of the shift key when it is engaged
        } else {
            setShiftColour('#19A957'); // defalt colour of the shift key for when it is dis-engaged
        }
    }

    const toggleShortcuts = () => {
        setShortcutsVisible(!shortcutsVisible);
    }

    // Function to handle the clicking of any key on the keyboard
    const handleKeyClick = (key) => {
        if (capsLock && key !== 'backspace' && key !== '\n') { // ensure that backspace does not become modifed
            key = key.toUpperCase(); // if caps lock is engaged then the pressed key must be capitalized
        } else if (shiftState && key !== 'backspace' && key !== '\n') {
            key = key.toUpperCase();
            toggleShift(); // toggle shift off after capitalizing just the current key
        }
        if (activeFieldLogin) { // If the active field is from the login component
            if (activeFieldLogin[0]) { // If the active field is username from the login component
                handleUsernameChangeLogin(key);
                handleChangeFormLogin(key, 0);
            } else if (activeFieldLogin[1]) { // If the active field is password from the login component
                handlePasswordChangeLogin(key);
                handleChangeFormLogin(key, 1);
            }
        }
        if (activeFieldReg) { // If the active field is from the register component
            if (activeFieldReg[0]) { // If the active field is username from the register component
                handleUsernameChangeReg(key);
                handleChangeFormRegister(key, 0);
            } else if (activeFieldReg[1]) { // If the active field is password from the register component
                handlePasswordChangeReg(key);
                handleChangeFormRegister(key, 1);
            } else if (activeFieldReg[2]) { // If the active field is confirm password from the register component
                handleConfirmPasswordChangeReg(key);
                handleChangeFormRegister(key, 2);
            }
        }
        if (editingTextEditor) { // If the active field is the text editor
            if (key === 'backspace') {
                setTextData(prevTextData => prevTextData.slice(0, -1));
            } else {
                setTextData(prevTextData => prevTextData + key);
            }
        }
    };

    // Function for handling typing in the login form that is displayed inside the keyboard
    const handleChangeFormLogin = (key, index) => {
        setLoginData(prevLoginData => {
            if (key === 'backspace') {
                // If backspace is pressed, remove the last character from the string at the specified index
                return prevLoginData.map((item, i) => (i === index ? item.slice(0, -1) : item));
            } else {
                // Append the typed character to the string at the specified index
                return prevLoginData.map((item, i) => (i === index ? item + key : item));
            }
        });
    };

    // Function for handling typing in the register form that is displayed inside the keyboard
    const handleChangeFormRegister = (key, index) => {
        setRegData(prevRegData => {
            if (key === 'backspace') {
                // If backspace is pressed, remove the last character from the string at the specified index
                return prevRegData.map((item, i) => (i === index ? item.slice(0, -1) : item));
            } else {
                // Append the typed character to the string at the specified index
                return prevRegData.map((item, i) => (i === index ? item + key : item));
            }
        });
    };

    // Function to handle logging the user out
    const handleLogout = async (e) => {

        if (isLoggedIn) {
            navigate('/');
            setIsLoggedIn(false);
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            setEditingTextEditor(false);
        } else {

        }
    }


    // Word Prediction

    const fetchPredictiveText = async (word) => {
        if (!word) {
            setPredictions(['Word 1', 'Word 2', 'Word 3', 'Word 4']);
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/fetchAutoComplete?unfinished_word=${word}`, {
                method: 'GET', // or 'POST', depending on your API requirement
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Predictive text API response:', data); // Log the response
            if (Array.isArray(data.topWords)) {
                const paddedPredictions = [...data.topWords, 'Word 1', 'Word 2', 'Wrd 3', 'Word 4'].slice(0, 4);
                setPredictions(paddedPredictions);
            } else {
                console.error("Expected an array for predictions but received:", data.topWords);
                setPredictions(['Word 1', 'Wrd 2', 'Word 3', 'Word 4']);
            }
        } catch (error) {
            console.error("Error fetching predictions:", error.message);
            setPredictions(['Wrd 1', 'Word 2', 'Word 3', 'Word 4']);
        }
    };
    // Effect hook to fetch predictive text when currentWord changes
    useEffect(() => {
        fetchPredictiveText(currentWord);
    }, [currentWord]);

    // Enhanced handleKeyClick function to manage currentWord state
    const handleKeyClickEnhanced = (key) => {
        // Existing logic to handle key press
        handleKeyClick(key); // Original function logic remains the same

        // Update for predictive text logic
        let updatedCurrentWord = currentWord;
        if (key === 'backspace') {
            updatedCurrentWord = currentWord.slice(0, -1);
        } else if (key === ' ' || key === '\n') {
            updatedCurrentWord = ''; // Reset on space or enter
        } else if (/^[a-zA-Z]$/.test(key)) { // Only consider alphabetic characters
            updatedCurrentWord = currentWord + key;
        }
        setCurrentWord(updatedCurrentWord);

        // Immediately update predictions based on the updated current word
        fetchPredictiveText(updatedCurrentWord); // Just fetch, don't set predictions here
    };


    return (
        <div className="z-50 w-full flex flex-col justify-end overflow-y-auto">

            {isVisible && (
                <div>
                    {wordBarVisibility && (
                        <button
                            className="w-full h-[65px] flex flex-row bg-[#2594D9] lg:h-[79px]"
                            onClick={toggleWordBarVisibility}
                        >
                            <div className="h-full w-[21.875%] border-r-2 border-y-2 border-black flex flex-row items-center justify-center">
                                <p className="text-white lg:text-lg">{predictions[0] || 'NA'}</p>
                            </div>
                            <div className="h-full w-[21.875%] border-r-2 border-y-2 border-black flex flex-row items-center justify-center">
                                <p className="text-white lg:text-lg">{predictions[1] || 'NA'}</p>
                            </div>
                            <div className="w-[12.5%] h-full border-y-2 border-black flex flex-row justify-center items-center font-bold text-black">
                                <img
                                    className="object-cover w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                                    src="../assets/images/png/hide-keyboard-icon.png"
                                    alt="shortcut icon"
                                />
                            </div>
                            <div className="h-full w-[21.875%] border-l-2 border-y-2 border-black flex flex-row items-center justify-center">
                                <p className="text-white lg:text-lg">{predictions[2] || 'NA'}</p>
                            </div>
                            <div className="h-full w-[21.875%] border-l-2 border-y-2 border-black flex flex-row items-center justify-center">
                                <p className="text-white lg:text-lg">{predictions[3] || 'NA'}</p>
                            </div>
                        </button>
                    )}
                    {!wordBarVisibility && (
                        <div
                            className="w-full h-[65px] flex border-y-2 border-black flex-row bg-[#2594D9] lg:h-[79px]"
                        >
                            <div className="h-full w-[21.25%] hover:bg-[#6ab8e9] hover:cursor-pointer flex flex-row items-center justify-center border-r-2 border-black">
                                <button>
                                    <p className="text-white lg:text-lg">{predictions[0] || 'NA'}</p>
                                </button>
                            </div>
                            <div className="h-full w-[21.25%] hover:bg-[#6ab8e9] hover:cursor-pointer border-r-2 border-black flex flex-row items-center justify-center">
                                <button>
                                    <p className="text-white lg:text-lg">{predictions[1] || 'NA'}</p>
                                </button>
                            </div>
                            <div
                                className="w-[15%] h-full flex flex-row justify-center items-center font-bold text-black py-1 gap-1"
                            >
                                <button
                                    className="bg-[#1B2C3E] hover:bg-[#6ab8e9] w-[45%] h-[90%] hover:cursor-pointer rounded-md flex justify-center items-center"
                                    onClick={() => {
                                        closeKeyboard();
                                        handleLogout();
                                    }}
                                >
                                    {!isLoggedIn && (
                                        <img
                                            className="object-cover w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                                            src="../assets/images/png/hide-keyboard-icon.png"
                                            alt="shortcut icon"
                                        />
                                    )}
                                    {isLoggedIn && (
                                        <p className="text-white text-xs sm:text-base lg:text-lg">Logout</p>
                                    )}
                                </button>
                                <button
                                    className="bg-[#1B2C3E] hover:bg-[#6ab8e9] hover:cursor-pointer text-white w-[45%] h-[90%] rounded-md sm:text-xl md:text-2xl lg:text-3xl flex justify-center items-center"
                                    onClick={toggleWordBarVisibility}
                                >
                                    🡫
                                </button>
                            </div>
                            <div className="h-full w-[21.25%] hover:bg-[#6ab8e9] hover:cursor-pointer border-l-2 border-black flex flex-row items-center justify-center">
                                <button>
                                    <p className="text-white lg:text-lg">{predictions[2] || 'NA'}</p>
                                </button>
                            </div>
                            <div className="h-full w-[21.25%] hover:bg-[#6ab8e9] hover:cursor-pointer border-l-2 border-black flex flex-row items-center justify-center">
                                <button>
                                    <p className="text-white lg:text-lg">{predictions[3] || 'NA'}</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isVisible && (
                <div className="w-full h-[92vh] flex flex-row justify-center items-center bg-[#1B2C3E]">

                    <div className="w-full h-full flex flex-col justify-end items-center py-3">

                        <div className="w-full h-full mb-3">
                            {isLoggedIn && (
                                <TextEditor textData={textData} />
                            )}

                            {(activeFieldLogin[0] || activeFieldLogin[1] || activeFieldReg[0] || activeFieldReg[1] || activeFieldReg[2]) && (
                                <FormFieldEditor activeFieldLogin={activeFieldLogin} activeFieldReg={activeFieldReg} loginData={loginData} regData={regData} />
                            )}
                        </div>

                        <div className="flex flex-row justify-center">

                            {mainSuperkeyVisibility && (
                                <div className="mr-3 md:mr-[18px] lg:mr-[30px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-none sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys off
                                            toggleZoomedSuperkeyVisibility(0); // Toggle desired superkey on
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[0]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[1]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[2]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[0] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(0); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-none sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('q')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[0]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('w')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[1]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('e')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[2]}</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-3 md:mr-[18px] lg:mr-[30px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(1);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[3]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[4]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[5]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[6]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[1] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(1); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('r')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[3]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('t')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[4]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('y')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[5]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('u')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[6]}</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div>
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-tl-md rounded-tr-md rounded-bl-none rounded-br-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(2);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[7]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[8]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[9]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[2] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(2); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-tl-md rounded-tr-md rounded-bl-none rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('i')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[7]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('o')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[8]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('p')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[9]}</button>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-row justify-center">

                            {mainSuperkeyVisibility && (
                                <div className="mr-4 md:mr-6 lg:mr-10">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(0);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[10]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[11]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[12]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[0] && (
                                <div className="ml-9 md:ml-12 lg:ml-20">

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('a')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[10]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('s')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[11]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('d')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[12]}</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-4 md:mr-6 lg:mr-10">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(1);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[13]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[14]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[15]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[1] && (
                                <div>
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('f')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[13]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('g')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[14]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('h')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[15]}</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div>
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(2);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[16]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[17]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[18]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[2] && (
                                <div className="mr-8 md:mr-16 lg:mr-24">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('j')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[16]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('k')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[17]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('l')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[18]}</button>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-row justify-center mt-4">

                            {mainSuperkeyVisibility && (
                                <div className="mr-[19px] md:mr-[28.5px] lg:mr-[47.5px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-[#22D26D] flex flex-row items-center rounded-t-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(3);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]"><img className="object-cover w-[22px] h-[24px] lg:w-[30px] lg:h-[34px]" src="../assets/images/png/shortcut-icon.png" alt="shortcut icon" /></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[3] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(3); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-t-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button
                                            className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"
                                            onClick={() => {
                                                toggleZoomedSuperkeyVisibility(3); // Toggle desired superkey off
                                                toggleShortcuts();
                                            }}
                                        >
                                            <img className="object-cover w-[33px] h-[36px] lg:w-[45px] lg:h-[51px]" src="../assets/images/png/shortcut-icon.png" alt="shortcut icon" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {shortcutsVisible && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleShortcuts();
                                            toggleZoomedSuperkeyVisibility(3); // Toggle desired superkey on
                                        }}
                                    >
                                        Close Shortcuts
                                    </button>

                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]">S1</button>
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]">S2</button>
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]">S3</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-4 md:mr-6 lg:mr-10">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(4);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[19]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[20]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[21]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[4] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(4); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('z')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[19]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('x')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[20]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('c')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[21]}</button>
                                    </div>
                                </div>
                            )}
                            {numberVisibility && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleZoomedSuperkeyVisibility(4);
                                            toggleNumberVisibility();
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('1')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>1</button>
                                        <button onClick={() => handleKeyClickEnhanced('2')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>2</button>
                                        <button onClick={() => handleKeyClickEnhanced('3')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>3</button>
                                        <button onClick={() => handleKeyClickEnhanced('4')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>4</button>
                                        <button onClick={() => handleKeyClickEnhanced('5')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>5</button>
                                        <button onClick={() => handleKeyClickEnhanced('6')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>6</button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[0] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleZoomedSuperkeyVisibility(4);
                                            toggleSymbolVisibility(5);
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('!')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>!</button>
                                        <button onClick={() => handleKeyClickEnhanced('@')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>@</button>
                                        <button onClick={() => handleKeyClickEnhanced('#')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>#</button>
                                        <button onClick={() => handleKeyClickEnhanced('$')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>$</button>
                                        <button onClick={() => handleKeyClickEnhanced('%')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>%</button>
                                        <button onClick={() => handleKeyClickEnhanced('^')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>^</button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[1] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleZoomedSuperkeyVisibility(4);
                                            toggleSymbolVisibility(5);
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('(')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>(</button>
                                        <button onClick={() => handleKeyClickEnhanced(')')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>)</button>
                                        <button onClick={() => handleKeyClickEnhanced('-')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>-</button>
                                        <button onClick={() => handleKeyClickEnhanced('_')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>_</button>
                                        <button onClick={() => handleKeyClickEnhanced('=')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>=</button>
                                        <button onClick={() => handleKeyClickEnhanced('+')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>+</button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[2] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleZoomedSuperkeyVisibility(4);
                                            toggleSymbolVisibility(5);
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('[')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>[</button>
                                        <button onClick={() => handleKeyClickEnhanced(']')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>]</button>
                                        <button onClick={() => handleKeyClickEnhanced('{')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&#123;</button>
                                        <button onClick={() => handleKeyClickEnhanced('}')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&#125;</button>
                                        <button onClick={() => handleKeyClickEnhanced('\\')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>\</button>
                                        <button onClick={() => handleKeyClickEnhanced('|')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>|</button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[3] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleZoomedSuperkeyVisibility(4);
                                            toggleSymbolVisibility(5);
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('\'')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&apos;</button>
                                        <button onClick={() => handleKeyClickEnhanced('\"')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&quot;</button>
                                        <button onClick={() => handleKeyClickEnhanced('<')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&lt;</button>
                                        <button onClick={() => handleKeyClickEnhanced('>')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&gt;</button>
                                        <button onClick={() => handleKeyClickEnhanced(',')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>,</button>
                                        <button onClick={() => handleKeyClickEnhanced('.')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>.</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-[19px] md:mr-[28.5px] lg:mr-[47.5px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(5);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[22]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[23]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[24]}</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>{letterState[25]}</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[5] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(5); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('v')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[22]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('b')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[23]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('n')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[24]}</button>
                                        <button onClick={() => handleKeyClickEnhanced('m')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>{letterState[25]}</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div>
                                    <button
                                        type="button"
                                        className="h-14 bg-[#22D26D] flex flex-row items-center rounded-t-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(6);
                                        }}
                                    >
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#22D26D] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]"></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[6] && (
                                <div className="flex flex-col items-center">
                                    <button
                                        type="button"
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] hover:bg-[#2AF980] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility(); // Toggle all main superkeys back on
                                            toggleZoomedSuperkeyVisibility(6); // Toggle desired superkey off
                                        }}
                                    >
                                        Close Superkey
                                    </button>

                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-t-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClick('\n')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#22D26D] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"></button>
                                    </div>
                                </div>
                            )}


                        </div>

                        <div className="flex flex-row justify-center">

                            {mainSuperkeyVisibility && (
                                <div className="mr-4 md:mr-6 lg:mr-[43.5px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-[#22D26D] flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(3);
                                        }}
                                    >
                                        <div className="w-[38px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-16 md:w-[57px] lg:w-[95px] lg:h-[75px]" style={{ backgroundColor: capsLockColour }}><img className="object-cover w-[20px] h-[40px] lg:w-[25px] lg:h-[50px]" src="../assets/images/png/caps-shift-icon.png" alt="capslock and shift icon" /></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[3] && (
                                <div className="ml-[54px] md:ml-[74px] lg:ml-[120px]">
                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => toggleCapsLock()} disabled={shiftState} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]" style={{ backgroundColor: capsLockColour }}><img className="object-cover w-[25px] h-[25px] lg:w-[50px] lg:h-[50px]" src="../assets/images/png/capslock-icon.png" alt="capslock icon" /></button>
                                        <button onClick={() => toggleShift()} disabled={capsLock} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]" style={{ backgroundColor: shiftColour }}><img className="object-cover w-[33px] h-[28px] lg:w-[62px] lg:h-[53px]" src="../assets/images/png/shift-icon.png" alt="shift icon" /></button>
                                    </div>
                                </div>
                            )}
                            {shortcutsVisible && (
                                <div
                                    className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                >
                                    <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]">S4</button>
                                    <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]">S5</button>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-9 md:mr-[48px] lg:mr-[76px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(4);
                                        }}
                                    >
                                        <div className="w-[47px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[70.5px] lg:w-[117.5px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>123</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>.</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[4] && (
                                <div className="lg:mr-[5px]">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button
                                            className="w-[70.5px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[105.75px] lg:w-[176.25px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                            onClick={() => {
                                                toggleZoomedSuperkeyVisibility(4);
                                                toggleNumberVisibility();
                                            }}
                                        >
                                            123
                                        </button>
                                        <button
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                            onClick={() => {
                                                toggleZoomedSuperkeyVisibility(4);
                                                toggleSymbolVisibility(0);
                                            }}
                                        >
                                            .
                                        </button>
                                    </div>
                                </div>
                            )}
                            {numberVisibility && (
                                <div>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('7')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>7</button>
                                        <button onClick={() => handleKeyClickEnhanced('8')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>8</button>
                                        <button onClick={() => handleKeyClickEnhanced('9')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>9</button>
                                        <button onClick={() => handleKeyClickEnhanced('0')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>0</button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[0] && (
                                <div>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('&')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&</button>
                                        <button onClick={() => handleKeyClickEnhanced('*')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>*</button>
                                        <button onClick={() => {
                                            toggleSymbolVisibility(1);
                                        }}
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[1] && (
                                <div>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => {
                                            toggleSymbolVisibility(0);
                                        }}
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                        >
                                            ←
                                        </button>
                                        <button onClick={() => handleKeyClickEnhanced('`')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>`</button>
                                        <button onClick={() => handleKeyClickEnhanced('~')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>~</button>
                                        <button onClick={() => {
                                            toggleSymbolVisibility(2);
                                        }}
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[2] && (
                                <div>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => {
                                            toggleSymbolVisibility(1);
                                        }}
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                        >
                                            ←
                                        </button>
                                        <button onClick={() => handleKeyClickEnhanced(';')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>&</button>
                                        <button onClick={() => handleKeyClickEnhanced(':')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>*</button>
                                        <button onClick={() => {
                                            toggleSymbolVisibility(3);
                                        }}
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            )}
                            {symbolVisibility[3] && (
                                <div>

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => {
                                            toggleSymbolVisibility(2);
                                        }}
                                            className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}
                                        >
                                            ←
                                        </button>
                                        <button onClick={() => handleKeyClickEnhanced('?')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>?</button>
                                        <button onClick={() => handleKeyClickEnhanced('/')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>/</button>

                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-[23px] md:mr-[34.5px] lg:mr-[50px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(5);
                                        }}
                                    >
                                        <div className="w-[68px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[102px] lg:w-[170px] lg:h-[75px] lg:text-xl" style={{ backgroundColor: keyColor }}>space</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]" style={{ backgroundColor: keyColor }}><img className="object-cover w-[25px] h-[25px] lg:w-[40px] lg:h-[40px]" src="../assets/images/png/backspace-icon.png" alt="backspace icon" /></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[5] && (
                                <div className="mr-[15px] md:mr-[25px] lg:mr-[35px]">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced(' ')} className="w-[102px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[153px] lg:w-[255px] lg:h-[112.5px] lg:text-2xl" style={{ backgroundColor: keyColor }}>space</button>
                                        <button onClick={() => handleKeyClickEnhanced('backspace')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]" style={{ backgroundColor: keyColor }}><img className="object-cover w-[37.5px] h-[37.5px] lg:w-[60px] lg:h-[60px]" src="../assets/images/png/backspace-icon.png" alt="backspace icon" /></button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div>
                                    <button
                                        type="button"
                                        className="h-14 bg-[#22D26D] flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(6);
                                        }}
                                    >
                                        <div className="w-[48px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#22D26D] sm:h-16 md:w-[72px] lg:w-[120px] lg:h-[75px]"><img className="object-cover w-[40px] h-[40px] lg:w-[55px] lg:h-[55px]" src="../assets/images/png/return-icon.png" alt="return icon" /></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[6] && (
                                <div className="mr-[27px] md:mr-[42px] lg:mr-[67.5px]">
                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClickEnhanced('\n')} className="w-[72px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#22D26D] hover:bg-[#2AF980] sm:h-[96px] md:w-[108px] lg:w-[180px] lg:h-[112.5px]"><img className="object-cover w-[60px] h-[60px] lg:w-[82.5px] lg:h-[82.5px]" src="../assets/images/png/return-icon.png" alt="return icon" /></button>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}

export const toggleKeyboardVisibility = Keyboard.toggleKeyboardVisibility;
export const isKeyboardOpen = () => Keyboard.visible;

export default Keyboard;