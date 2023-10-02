import React from "react";
import { userInputStore } from '../../store/inputStore';

interface ModelParameters{
    value: string;
    onChange: (event:any)=>void;
}

//model are the inputs from the user, these are part of the prompt
export function Model(){
    
    const [userInput, 
           udpateUserInput] = userInputStore((state)=>[state.userInputs, 
                                                         state.updateUserInput]);

    return(
        <>
            <h1>Input something</h1>
            <textarea id="input-model-alwaysActive" 
                      value={userInput}
                      onChange={(event)=>udpateUserInput(event.target.value)}
                      className="text-black h-44 w-[40rem] rounded resize-none p-2" 
            >
            </textarea>

        </>
    )
}

export default Model;