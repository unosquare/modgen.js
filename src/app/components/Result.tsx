import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

interface ResultTypes {
    data: string | undefined | null;
    userResults: string;
    updateUserResults: (input: string) => void;
    disabled: boolean;
    isLoading: boolean;
    modeUp: boolean;
}

// results are GPT responses exemplified by the user
export const Result = ({ data, userResults, updateUserResults, disabled, isLoading, modeUp }: ResultTypes) => {
    useEffect(() => {
        if (typeof data === 'string') {
            updateUserResults(data);
        }
    }, [data, updateUserResults]);

    const textAreaClassName = isLoading ? 'animate-pulse ' : '';

    const placeHolderText = modeUp ? 'Field deactivated, input code in model to review it' : 'Input a result...';

    return (
        <div className='flex flex-col w-[50%] h-full grow border border-gray-700'>
            <h1 className='basis-[2%] ml-2'>Result</h1>
            <div className='basis-[98%] overflow-auto font-mono'>
                <Editor
                    value={userResults}
                    highlight={(userResultsWritten) => highlight(userResultsWritten, languages.tsx, 'tsx')}
                    onValueChange={(userResultsWritten) => updateUserResults(userResultsWritten)}
                    className={`min-h-full text-black bg-white ${textAreaClassName}`}
                    padding={7}
                    preClassName='!break-all'
                    textareaClassName='!break-all'
                    disabled={disabled}
                    placeholder={placeHolderText}
                />
            </div>
        </div>
    );
};

export default Result;
