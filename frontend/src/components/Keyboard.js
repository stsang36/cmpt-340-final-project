import React, { useState } from "react";


const Keyboard = ({ isVisible, closeKeyboard, handleUsernameChangeLogin, handlePasswordChangeLogin, handleUsernameChangeReg, handlePasswordChangeReg, handleConfirmPasswordChangeReg, activeFieldLogin, activeFieldReg }) => {

    const [mainSuperkeyVisibility, setMainSuperkeyVisibility] = useState(true); // State to track whether all the zoomed out superkeys are visible or not
    const [zoomedSuperkeyVisibility, setZoomedSuperkeyVisibility] = useState([false, false, false, false, false, false, false]); // State to track whether each of the zoomed in individual superkeys are visible or not
    const [wordBarVisibility, setWordBarVisibility] = useState(true); // State to track whether the word predication bar is visible
    const [capsLock, setCapsLock] = useState(false); // State to track whether caps lock is engaged or not


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

    // Function to toggle the caps lock on and off
    const toggleCapsLock = () => {
        setCapsLock(!capsLock);
    }

    // Function to handle the clicking of any key on the keyboard
    const handleKeyClick = (key) => {
        if (capsLock && key != 'backspace') { // ensure that backspace does not become modifed
            key = key.toUpperCase(); // if caps lock is engaged then the pressed key must be capitalized
        }
        if (activeFieldLogin) { // If the active field is from the login component
            if(activeFieldLogin[0]) { // If the active field is username from the login component
                handleUsernameChangeLogin(key);
            } else if (activeFieldLogin[1]) { // If the active field is password from the login component
                handlePasswordChangeLogin(key);
            }
        } else if (activeFieldReg) { // If the active field is from the register component
            if (activeFieldReg[0]) { // If the active field is username from the register component
                handleUsernameChangeReg(key);
            } else if (activeFieldReg[1]) { // If the active field is password from the register component
                handlePasswordChangeReg(key);
            } else if (activeFieldReg[2]) { // If the active field is confirm password from the register component
                handleConfirmPasswordChangeReg(key);
            }
        }
    };

    /*
    // Word Prediction

    const [prediction, setPrediction] = useState(null);
    const [prefixWord, setPrefixWord] = useState('');
    const [loading, setLoading] = useState(false); // temporarliy put it to true
    const [error, setError] = useState(null);
    //link with the backend predictive_text
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://127.0.0.1:8000/api/fetchNextWordPrediction/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prefix_word: prefixWord }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setPrediction(responseData.prediction);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch prediction');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [prefixWord]);

    const handleWordClick = (word) => {
        // Handle clicked word (e.g., update input field with the word)
        console.log('Clicked word:', word);
    };
    */

    return (
        <div className="z-50 fixed bottom-0 left-0 w-full flex flex-col justify-end">

            {isVisible && (
                <div>
                {wordBarVisibility && (
                    <button
                        className="w-full h-[50px] flex flex-row bg-[#2594D9] lg:h-[65px]"
                        onClick={toggleWordBarVisibility}
                    >
                        <div className="h-full w-[21.875%] border-r-2 border-y-2 border-black flex flex-row items-center justify-center">
                            <p className="text-white lg:text-lg">Word 1</p>
                        </div>
                        <div className="h-full w-[21.875%] border-r-2 border-y-2 border-black flex flex-row items-center justify-center">
                            <p className="text-white lg:text-lg">Word 2</p>
                        </div>
                        <div
                            className="w-[12.5%] h-full border-y-2 border-black flex flex-row justify-center items-center font-bold text-black"
                        >
                            <img
                                className="object-cover w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                                src="../assets/images/png/hide-keyboard-icon.png"
                                alt="shortcut icon"
                            />
                        </div>
                        <div className="h-full w-[21.875%] border-l-2 border-y-2 border-black flex flex-row items-center justify-center">
                            <p className="text-white lg:text-lg">Word 3</p>
                        </div>
                        <div className="h-full w-[21.875%] border-l-2 border-y-2 border-black flex flex-row items-center justify-center">
                            <p className="text-white lg:text-lg">Word 4</p>
                        </div>
                    </button>
                )}
                {!wordBarVisibility && (
                            <div
                                className="w-full h-[150px] flex border-y-2 border-black flex-row bg-[#2594D9] sm:h-[175px] md:h-[200px] lg:h-[250px]"
                            >
                                <div className="h-full w-[21.875%] hover:bg-[#6ab8e9] hover:cursor-pointer flex flex-row items-center justify-center border-r-2 border-black">
                                    <button>
                                        <p className="text-white lg:text-lg">Word 1</p>
                                    </button>
                                </div>
                                <div className="h-full w-[21.875%] hover:bg-[#6ab8e9] hover:cursor-pointer border-r-2 border-black flex flex-row items-center justify-center">
                                    <button>
                                        <p className="text-white lg:text-lg">Word 2</p>
                                    </button>
                                </div>
                                
                                <div
                                    className="w-[12.5%] h-full flex flex-col justify-center items-center font-bold text-black py-1"
                                >
                                    <button
                                        className="bg-[#1B2C3E] hover:bg-[#6ab8e9] w-[90%] h-[45%] mb-3 hover:cursor-pointer rounded-md flex justify-center items-center"
                                        onClick={closeKeyboard}
                                    >
                                        <img
                                            className="object-cover w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                                            src="../assets/images/png/hide-keyboard-icon.png"
                                            alt="shortcut icon"
                                        />
                                    </button>
                                    <button
                                        className="bg-[#1B2C3E] hover:bg-[#6ab8e9] hover:cursor-pointer text-white w-[90%] h-[45%] rounded-md sm:text-xl md:text-2xl lg:text-3xl"
                                        onClick={toggleWordBarVisibility}
                                    >
                                        🡫
                                    </button>
                                    
                                </div>
                                <div className="h-full w-[21.875%] hover:bg-[#6ab8e9] hover:cursor-pointer border-l-2 border-black flex flex-row items-center justify-center">
                                    <button>
                                        <p className="text-white lg:text-lg">Word 3</p>
                                    </button>
                                </div>
                                <div className="h-full w-[21.875%] hover:bg-[#6ab8e9] hover:cursor-pointer border-l-2 border-black flex flex-row items-center justify-center">
                                    <button>
                                        <p className="text-white lg:text-lg">Word 4</p>
                                    </button>
                                </div>
                                </div>
                        )}
                    </div>
            )}

            {isVisible && (
                <div className="w-full h-[340px] flex flex-row justify-center items-center bg-[#1B2C3E] sm:h-[425px] lg:h-[500px]">

                    <div className="w-full h-full flex flex-col justify-end items-center py-3">

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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">Q</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">W</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">E</div>
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
                                        <button onClick={() => handleKeyClick('q')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">Q</button>
                                        <button onClick={() => handleKeyClick('w')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">W</button>
                                        <button onClick={() => handleKeyClick('e')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">E</button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">R</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">T</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">Y</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">U</div>
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
                                        <button onClick={() => handleKeyClick('r')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">R</button>
                                        <button onClick={() => handleKeyClick('t')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">T</button>
                                        <button onClick={() => handleKeyClick('y')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">Y</button>
                                        <button onClick={() => handleKeyClick('u')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">U</button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">I</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">O</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">P</div>
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
                                        <button onClick={() => handleKeyClick('i')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">I</button>
                                        <button onClick={() => handleKeyClick('o')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">O</button>
                                        <button onClick={() => handleKeyClick('p')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">P</button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">A</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">S</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">D</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[0] && (
                                <div className="ml-9 md:ml-12 lg:ml-20">

                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClick('a')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">A</button>
                                        <button onClick={() => handleKeyClick('s')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">S</button>
                                        <button onClick={() => handleKeyClick('d')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">D</button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">F</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">G</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">H</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[1] && (
                                <div>
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClick('f')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">F</button>
                                        <button onClick={() => handleKeyClick('g')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">G</button>
                                        <button onClick={() => handleKeyClick('h')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">H</button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">J</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">K</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">L</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[2] && (
                                <div className="mr-8 md:mr-16 lg:mr-24">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClick('j')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">J</button>
                                        <button onClick={() => handleKeyClick('k')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">K</button>
                                        <button onClick={() => handleKeyClick('l')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">L</button>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-row justify-center mt-4">

                            {mainSuperkeyVisibility && (
                                <div className="mr-[19px] md:mr-[28.5px] lg:mr-[47.5px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-[#22D26D] hover:bg-[#2AF980] flex flex-row items-center rounded-t-md sm:h-[72px] lg:h-[85px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"><img className="object-cover w-[33px] h-[36px] lg:w-[45px] lg:h-[51px]" src="../assets/images/png/shortcut-icon.png" alt="shortcut icon" /></button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">Z</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">X</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">C</div>
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
                                        <button onClick={() => handleKeyClick('z')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">Z</button>
                                        <button onClick={() => handleKeyClick('x')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">X</button>
                                        <button onClick={() => handleKeyClick('c')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">C</button>
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
                                        <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">V</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">B</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">N</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">M</div>
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
                                        <button onClick={() => handleKeyClick('v')} className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">V</button>
                                        <button onClick={() => handleKeyClick('b')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">B</button>
                                        <button onClick={() => handleKeyClick('n')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">N</button>
                                        <button onClick={() => handleKeyClick('m')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">M</button>
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#22D26D] hover:bg-[#2AF980] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"></button>
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
                                        <div className="w-[38px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-16 md:w-[57px] lg:w-[95px] lg:h-[75px]"><img className="object-cover w-[20px] h-[40px] lg:w-[25px] lg:h-[50px]" src="../assets/images/png/caps-shift-icon.png" alt="capslock and shift icon" /></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[3] && (
                                <div className="ml-[12px] md:ml-[18px] lg:ml-[29.5px]">
                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[57px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] hover:bg-[#2AF980] sm:h-[96px] md:w-[85.5px] lg:w-[142.5px] lg:h-[112.5px]"><img className="object-cover w-[30px] h-[60px] lg:w-[37.5px] lg:h-[75px]" src="../assets/images/png/caps-shift-icon.png" alt="capslock and shift icon" /></button>
                                    </div>
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
                                        <div className="w-[47px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[70.5px] lg:w-[117.5px] lg:h-[75px] lg:text-xl">123</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">.</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[4] && (
                                <div className="lg:mr-[5px]">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[70.5px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[105.75px] lg:w-[176.25px] lg:h-[112.5px] lg:text-2xl">123</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">.</button>
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
                                        <div className="w-[68px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[102px] lg:w-[170px] lg:h-[75px] lg:text-xl">space</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]"><img className="object-cover w-[25px] h-[25px] lg:w-[40px] lg:h-[40px]" src="../assets/images/png/backspace-icon.png" alt="backspace icon" /></div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[5] && (
                                <div className="mr-[15px] md:mr-[25px] lg:mr-[35px]">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button onClick={() => handleKeyClick(' ')} className="w-[102px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[153px] lg:w-[255px] lg:h-[112.5px] lg:text-2xl">space</button>
                                        <button onClick={() => handleKeyClick('backspace')} className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] hover:bg-[#BCBCBC] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"><img className="object-cover w-[37.5px] h-[37.5px] lg:w-[60px] lg:h-[60px]" src="../assets/images/png/backspace-icon.png" alt="backspace icon" /></button>
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
                            {zoomedSuperkeyVisibility[6] && ( // IMPLEMENT RETURN ON BUTTON CLICK
                                <div className="mr-[27px] md:mr-[42px] lg:mr-[67.5px]">
                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[72px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#22D26D] hover:bg-[#2AF980] sm:h-[96px] md:w-[108px] lg:w-[180px] lg:h-[112.5px]"><img className="object-cover w-[60px] h-[60px] lg:w-[82.5px] lg:h-[82.5px]" src="../assets/images/png/return-icon.png" alt="return icon" /></button>
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