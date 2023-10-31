import { ShotsTypes } from '@/store/inputStore';
import React from 'react';

interface interfaceButtonsEx{
    classNameForButton: string;
    userInputs: string;
    classNameForSend:string;
    handleDeleteAll: ()=>void;
    isLoading: boolean;
    disabled: boolean
    examples: ShotsTypes[];
    send:(examples:any[], lastPrompt:string)=>void;
}

function ButtonsEx({
    classNameForButton,
    userInputs,
    classNameForSend,
    handleDeleteAll,
    isLoading,
    disabled,
    examples,
    send
}:interfaceButtonsEx) {
    return(
        <div id='examples-btns' className='flex flex-row justify-start flex-initial basis-1/12'>
            <button type='button'
                    className={`flex-initial  py-2 px-2 rounded mr-5 ${classNameForButton}`}
                    onClick={handleDeleteAll}
                    disabled={isLoading}
            >
                Delete all
            </button>
            <button onClick={()=>send(examples, userInputs)} 
                    type='button' 
                    className={`flex-initial py-2 px-2 rounded ${classNameForSend}`}
                    disabled={disabled}
            >
                Send
            </button>
        </div>
    )
}

export default ButtonsEx;