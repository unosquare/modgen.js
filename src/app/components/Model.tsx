import React from "react";

interface ModelTypes{
    userInput: string;
    updateUserInput: (input:string)=>void;
}

//model are the inputs from the user, these are part of the prompt
export function Model({ userInput, updateUserInput }: ModelTypes){

    return(
        <>
            <h1>Input something</h1>
            <textarea id="input-model-alwaysActive" 
                      value={userInput}
                      onChange={(event)=>updateUserInput(event.target.value)}
                      className="flex-1 text-black h-44 w-[40rem] rounded resize-none p-2" 
            >
            </textarea>

        </>
    )
}

export default Model;