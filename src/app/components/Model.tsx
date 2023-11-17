/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
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
export const Model = ({ userInput, updateUserInput, disabled }: ModelTypes) => {
    const [copyText, onCopyText] = useState('Copy to clipboard');

    return (
        <div className='flex flex-col w-[50%] h-full grow border border-gray-700'>
            <div className='flex flex-row justify-between'>
                <h1 className='basis-[2%] ml-2'>Model</h1>
                <button
                    className={`mr-4 px-2 py-0 text-xs ${copyText === 'Copied!' ? ' text-yellow-300' : ''}`}
                    onClick={() => {
                        navigator.clipboard.writeText(userInput);
                        onCopyText('Copied!');
                        setTimeout(() => {
                            onCopyText('Copy to clipboard');
                        }, 2000);
                    }}
                    disabled={copyText === 'Copied!'}
                >
                    {copyText}
                </button>
            </div>
            <div className='basis-[98%] overflow-auto bg-white text-black whitespace-pre-wrap grow font-mono'>
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
};

export default Model;
