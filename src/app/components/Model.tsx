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
    <>
        <h1 className='basis-1/12'>Input</h1>
        <div className='basis-5/12 lg:max-h-96 xl:max-h-[28rem] 2xl:max-h-[50rem] overflow-auto rounded bg-white text-black w-full whitespace-pre-wrap'>
            <Editor
                value={userInput}
                highlight={(userInputWritten) => highlight(userInputWritten, languages.tsx, 'tsx')}
                onValueChange={(userInputWritten) => updateUserInput(userInputWritten)}
                className='resize-none'
                style={{
                    minHeight: '100%',
                }}
                preClassName='!break-all '
                textareaClassName='!break-all '
                padding={7}
                disabled={disabled}
                placeholder='Input some code...'
            />
        </div>
    </>
);

export default Model;
