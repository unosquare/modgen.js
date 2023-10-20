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
            <div className="overflow-auto basis-5/12 rounded bg-white text-black w-full whitespace-pre-wrap">
                <Editor value={userInput}
                        highlight={userInput => highlight(userInput, languages.javascript,'javascript')}
                        onValueChange={userInput=>updateUserInput(userInput)}
                        style={{
                            minHeight:"100%",
                            borderRadius:"0.25rem",
                        }}
                        preClassName="!break-all"
                        textareaClassName="!break-all"
                        padding={7}
                        disabled={disabled}
                        placeholder="Input some code..."
                />
            </div>
        </>
    )
}

export default Model;