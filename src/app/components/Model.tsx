import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

interface ModelTypes {
    userInput: string;
    updateUserInput: (input: string) => void;
    disabled: boolean;
}

// model are the inputs from the user, these are part of the prompt
export const Model = ({ userInput, updateUserInput, disabled }: ModelTypes) => (
    <div className='flex flex-col w-[50%] h-full grow border border-gray-700'>
        <h1 className='basis-[2%] ml-2'>Model</h1>
        <div className='basis-[98%] overflow-auto bg-white text-black whitespace-pre-wrap grow'>
            <Editor
                value={userInput}
                highlight={(userInputWritten) => highlight(userInputWritten, languages.tsx, 'tsx')}
                onValueChange={(userInputWritten) => updateUserInput(userInputWritten)}
                className='min-h-full'
                preClassName='!break-all '
                textareaClassName='!break-all '
                padding={7}
                disabled={disabled}
                placeholder='Input some code...'
            />
        </div>
    </div>
);

export default Model;
