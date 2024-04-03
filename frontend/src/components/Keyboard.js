import React, { useState } from "react";

// Outer container has 51% height
// Word predictor container has 7% height
// Keyboard container has 44% height

const Keyboard = () => {
    // State to track whether the keyboard is visible or not
    const [keyboardVisible, setKeyboardVisible] = useState(true);

    // Function to toggle the visibility of the keyboard
    const toggleKeyboardVisibility = () => {
        setKeyboardVisible(!keyboardVisible);
    };
    return (
        <div className="z-50 fixed bottom-0 left-0 w-full flex flex-col justify-end">
            <button
                className="absolute bottom-4 left-4 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"
                onClick={toggleKeyboardVisibility}
            >
                <img
                    className="w-8 h-8"
                    src="../assets/images/png/Keyboard-icon.png"
                    alt="Keyboard Icon"
                />
            </button>
            {keyboardVisible && (
                <div className="w-full h-[50px] flex flex-row border-t-2 border-black bg-[#2594D9] lg:h-[65px]">
                    <div className="h-full w-[21.875%] border-r-2 border-black flex flex-row items-center justify-center">
                        <p className="text-white lg:text-lg">Word 1</p>
                    </div>
                    <div className="h-full w-[21.875%] border-r-2 border-black flex flex-row items-center justify-center">
                        <p className="text-white lg:text-lg">Word 2</p>
                    </div>
                    <button
                        className="w-[12.5%] h-full rounded-md flex flex-row justify-center items-center font-bold text-black"
                        onClick={toggleKeyboardVisibility}
                    >
                        <img
                            className="object-cover w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                            src="../assets/images/png/hide-keyboard-icon.png"
                            alt="shortcut icon"
                        />
                    </button>
                    <div className="h-full w-[21.875%] border-l-2 border-black flex flex-row items-center justify-center">
                        <p className="text-white lg:text-lg">Word 3</p>
                    </div>
                    <div className="h-full w-[21.875%] border-l-2 border-black flex flex-row items-center justify-center">
                        <p className="text-white lg:text-lg">Word 4</p>
                    </div>
                </div>
            )}

            {keyboardVisible && (
                <div className="w-full h-[300px] flex flex-row justify-center items-center bg-[#1B2C3E] sm:h-[350px] lg:h-[425px]">

                    <div className="w-full h-full flex flex-col justify-center py-3">

                        <div className="flex flex-row justify-center">

                            <div className="mr-3 md:mr-[18px] lg:mr-[30px]">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-none sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">Q</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">W</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">E</div>
                                </button>
                            </div>

                            <div className="mr-3 md:mr-[18px] lg:mr-[30px]">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">R</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">T</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">Y</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">U</div>
                                </button>
                            </div>

                            <div>
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-tl-md rounded-tr-md rounded-bl-none rounded-br-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">I</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">O</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">P</div>
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-row justify-center">

                            <div className="mr-4 md:mr-6 lg:mr-10">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">A</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">S</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">D</div>
                                </button>
                            </div>

                            <div className="mr-4 md:mr-6 lg:mr-10">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">F</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">G</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">H</div>
                                </button>
                            </div>

                            <div>
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">J</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">K</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">L</div>
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-row justify-center mt-4">

                            <div className="mr-[19px] md:mr-[28.5px] lg:mr-[47.5px]">
                                <button type="button" className="h-14 bg-[#22D26D] flex flex-row items-center rounded-t-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]"><img className="object-cover w-[22px] h-[24px] lg:w-[30px] lg:h-[34px]" src="../assets/images/png/shortcut-icon.png" alt="shortcut icon" /></div>
                                </button>
                            </div>

                            <div className="mr-4 md:mr-6 lg:mr-10">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">Z</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">X</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">C</div>
                                </button>
                            </div>

                            <div className="mr-[19px] md:mr-[28.5px] lg:mr-[47.5px]">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">V</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">B</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">N</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">M</div>
                                </button>
                            </div>

                            <div>
                                <button type="button" className="h-14 bg-[#22D26D] flex flex-row items-center rounded-t-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[30px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#22D26D] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]"></div>
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-row justify-center">

                            <div className="mr-4 md:mr-6 lg:mr-[45px]">
                                <button type="button" className="h-14 bg-[#22D26D] flex flex-row items-center rounded-tl-none rounded-tr-md rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[38px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#19A957] sm:h-16 md:w-[57px] lg:w-[95px] lg:h-[75px]"><img className="object-cover w-[20px] h-[40px] lg:w-[25px] lg:h-[50px]" src="../assets/images/png/caps-shift-icon.png" alt="capslock and shift icon" /></div>
                                </button>
                            </div>

                            <div className="mr-9 md:mr-[48px] lg:mr-[121px]">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[47px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[70.5px]">123</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px] lg:text-xl">.</div>
                                </button>
                            </div>

                            <div className="mr-[23px] md:mr-[34.5px] lg:mr-[50.5px]">
                                <button type="button" className="h-14 bg-white flex flex-row items-center rounded-b-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[68px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[102px] lg:w-[170px] lg:h-[75px] lg:text-xl">space</div>
                                    <div className="w-[30px] h-12 mr-1 rounded-md flex flex-row justify-center items-center font-bold text-black bg-[#E3E3E3] sm:h-16 md:w-[45px] lg:w-[75px] lg:h-[75px]"><img className="object-cover w-[25px] h-[25px] lg:w-[40px] lg:h-[40px]" src="../assets/images/png/backspace-icon.png" alt="backspace icon" /></div>
                                </button>
                            </div>

                            <div>
                                <button type="button" className="h-14 bg-[#22D26D] flex flex-row items-center rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md sm:h-[72px] lg:h-[85px]">
                                    <div className="w-[48px] h-12 mx-1 rounded-md flex flex-row justify-center items-center font-bold text-white bg-[#22D26D] sm:h-16 md:w-[72px] lg:w-[120px] lg:h-[75px]"><img className="object-cover w-[40px] h-[40px] lg:w-[55px] lg:h-[55px]" src="../assets/images/png/return-icon.png" alt="return icon" /></div>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}

export default Keyboard;