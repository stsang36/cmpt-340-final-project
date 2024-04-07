
const FormFieldEditor = ({ activeFieldLogin, activeFieldReg, loginData, regData }) => {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">

            {activeFieldLogin[0] && activeFieldLogin && (
            <div className="w-full flex justify-center items-center">
                <p className="text-white mr-3">Username:</p>
                <input
                    className="rounded-md w-50 h-10 px-3"
                    type="text"
                    placeholder="Username"
                    readOnly
                    value={loginData[0]}
                />
            </div>
            )}
            {activeFieldLogin[1] && activeFieldLogin && (
            <div className="w-full flex justify-center items-center">
                <p className="text-white mr-3">Password:</p>
                <input
                    className="rounded-md w-50 h-10 px-3"
                    type="text"
                    placeholder="Password"
                    readOnly
                    value={loginData[1]}
                />
            </div>
            )}

            {activeFieldReg[0] && activeFieldReg && (
            <div className="w-full flex justify-center items-center">
                <p className="text-white mr-3">Username:</p>
                <input
                    className="rounded-md w-50 h-10 px-3"
                    type="text"
                    placeholder="Username"
                    readOnly
                    value={regData[0]}
                />
            </div>
            )}
            {activeFieldReg[1] && activeFieldReg && (
            <div className="w-full flex justify-center items-center">
                <p className="text-white mr-3">Password:</p>
                <input
                    className="rounded-md w-50 h-10 px-3"
                    type="text"
                    placeholder="Password"
                    readOnly
                    value={regData[1]}
                />
            </div>
            )}
            {activeFieldReg[2] && activeFieldReg && (
            <div className="w-full flex justify-center items-center">
                <p className="text-white mr-3">Confirm Password:</p>
                <input
                    className="rounded-md w-50 h-10 px-3"
                    type="text"
                    placeholder="Confirm Password"
                    readOnly
                    value={regData[2]}
                />
            </div>
            )}                        
                                
        </div>
    );
  }
  
  export default FormFieldEditor;