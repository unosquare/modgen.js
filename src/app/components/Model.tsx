import React from "react";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

interface ModelTypes{
    userInput: string;
    updateUserInput: (input:string)=>void;
    disabled: boolean;
}

//model are the inputs from the user, these are part of the prompt
export function Model({ userInput, updateUserInput, disabled }: ModelTypes){

    return(
        <>
            <h1 className="basis-1/12">Input</h1>
            <div className="overflow-auto basis-5/12 rounded bg-white text-black max-w-full">
                <Editor value={userInput}
                        highlight={userInput => highlight(userInput, languages.javascript,'javascript')}
                        onValueChange={userInput=>updateUserInput(userInput)}
                        style={{
                            minHeight:"100%",
                            maxWidth:"90%",
                            borderRadius:"0.25rem"
                        }}
                        padding={7}
                        disabled={disabled}
                        placeholder="Input some code..."
                />
            </div>
            {/* <textarea value={userInput}
                      onChange={(event)=>{updateUserInput(event.target.value); console.log(event.target)}}
                      className="text-black basis-5/12 w-full rounded p-2 resize-none whitespace-pre-wrap" 
                      disabled={disabled}
            /> */}

        </>
    )
}

export default Model;