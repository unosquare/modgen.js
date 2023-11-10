import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

interface ResultTypes {
    data: string | undefined | null;
    clickedAdd: () => void;
    userResults: string;
    updateUserResults: (input: string) => void;
    disabled: boolean;
    isLoading: boolean;
}

// results are GPT responses exemplified by the user
export const Result = ({ data, clickedAdd, userResults, updateUserResults, disabled, isLoading }: ResultTypes) => {
    useEffect(() => {
        if (typeof data === 'string') {
            updateUserResults(data);
        }
    }, [data, updateUserResults]);

    const textAreaClassName = isLoading ? 'animate-pulse' : '';
    const buttonClassName = disabled ? ' text-gray-400' : ' hover:bg-slate-600';

    return (
        <div className='flex flex-col w-[50%] h-full grow border border-gray-700'>
            <h1 className='basis-[2%] ml-2'>Result</h1>
            <div className='basis-[98%] overflow-auto'>
                <Editor
                    value={userResults}
                    highlight={(userResultsWritten) => highlight(userResultsWritten, languages.tsx, 'tsx')}
                    onValueChange={(userResultsWritten) => updateUserResults(userResultsWritten)}
                    className={`min-h-full text-black bg-white ${textAreaClassName}`}
                    padding={7}
                    preClassName='!break-all'
                    textareaClassName='!break-all'
                    disabled={disabled}
                    placeholder='Input a result...'
                />
            </div>
            {/* <div className='basis-1/12'>
                <button
                    type='button'
                    className={`rounded ${buttonClassName}`}
                    onClick={() => clickedAdd()}
                    disabled={disabled}
                >
                    Add
                </button>
            </div> */}
        </div>
    );
};

export default Result;
