import React, { useState } from "react";

// Outer container has 51% height
// Word predictor container has 7% height
// Keyboard container has 44% height

const Keyboard = ({ isVisible, closeKeyboard }) => {

    // State to track whether all the superkeys are visible or not
    const [mainSuperkeyVisibility, setMainSuperkeyVisibility] = useState(true);

    // Function to toggle the visibility of all the superkeys
    const toggleMainSuperkeyVisibility = () => {
        setMainSuperkeyVisibility(!mainSuperkeyVisibility);
    };

    // State to track whether the zoomed in individual superkeys are visible or not
    const [zoomedSuperkeyVisibility, setZoomedSuperkeyVisibility] = useState([false, false, false, false, false, false, false]);

    // Function to toggle the visibility of a specific superkey
    const toggleZoomedSuperkeyVisibility = (keyNumber) => {
        setZoomedSuperkeyVisibility(prevVisibility => (
            prevVisibility.map((visibility, index) => index === keyNumber ? !visibility : visibility)
        ));
    };

    // State to track whether the word predication bar is visible
    const [wordBarVisibility, setWordBarVisibility] = useState(true);

    // Function to toggle the visibility of the word predication bar
    const toggleWordBarVisibility = () => {
        setWordBarVisibility(!wordBarVisibility);
    };

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
                <div className="w-full h-[425px] flex flex-row justify-center items-center bg-[#1B2C3E] sm:h-[525px] lg:h-[650px]">

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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">Q</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">W</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">E</button>
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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">R</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">T</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">Y</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">U</button>
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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">I</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">O</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">P</button>
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">A</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">S</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">D</button>
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">F</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">G</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">H</button>
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">J</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">K</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">L</button>
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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"><img className="object-cover w-[33px] h-[36px] lg:w-[45px] lg:h-[51px]" src="../assets/images/png/shortcut-icon.png" alt="shortcut icon" /></button>
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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">Z</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">X</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">C</button>
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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">V</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">B</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">N</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">M</button>
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
                                        className="w-[200px] mb-[32.5px] h-[80px] bg-[#19A957] text-white rounded-md sm:h-[90px] md:h-[110px] md:w-[250px] lg:h-[140px] lg:w-[350px]"
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
                                        <button className="w-[45px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#22D26D] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"></button>
                                    </div>
                                </div>
                            )}


                        </div>

                        <div className="flex flex-row justify-center">

                            {mainSuperkeyVisibility && (
                                <div className="mr-4 md:mr-6 lg:mr-[45px]">
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
                                <div className="ml-[12px] md:ml-[18px] lg:ml-[29px]">
                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[57px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-[96px] md:w-[85.5px] lg:w-[142.5px] lg:h-[112.5px]"><img className="object-cover w-[30px] h-[60px] lg:w-[37.5px] lg:h-[75px]" src="../assets/images/png/caps-shift-icon.png" alt="capslock and shift icon" /></button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-9 md:mr-[48px] lg:mr-[121px]">
                                    <button
                                        type="button"
                                        className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]"
                                        onClick={() => {
                                            toggleMainSuperkeyVisibility();
                                            toggleZoomedSuperkeyVisibility(4);
                                        }}
                                    >
                                        <div className="w-[47px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[70.5px]">123</div>
                                        <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">.</div>
                                    </button>
                                </div>
                            )}
                            {zoomedSuperkeyVisibility[4] && (
                                <div className="lg:mr-[75px]">
                                    <div
                                        className="h-[84px] bg-white flex flex-row items-center rounded-b-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[70.5px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[105.75px]">123</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px] lg:text-2xl">.</button>
                                    </div>
                                </div>
                            )}

                            {mainSuperkeyVisibility && (
                                <div className="mr-[23px] md:mr-[34.5px] lg:mr-[50.5px]">
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
                                        <button className="w-[102px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[153px] lg:w-[255px] lg:h-[112.5px] lg:text-2xl">space</button>
                                        <button className="w-[45px] h-[72px] mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-[96px] md:w-[67.5px] lg:w-[112.5px] lg:h-[112.5px]"><img className="object-cover w-[37.5px] h-[37.5px] lg:w-[60px] lg:h-[60px]" src="../assets/images/png/backspace-icon.png" alt="backspace icon" /></button>
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
                                <div className="mr-[27px] md:mr-[42px] lg:mr-[67px]">
                                    <div
                                        className="h-[84px] bg-[#22D26D] flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[108px] lg:h-[127.5px]"
                                    >
                                        <button className="w-[72px] h-[72px] mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#22D26D] sm:h-[96px] md:w-[108px] lg:w-[180px] lg:h-[112.5px]"><img className="object-cover w-[60px] h-[60px] lg:w-[82.5px] lg:h-[82.5px]" src="../assets/images/png/return-icon.png" alt="return icon" /></button>
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