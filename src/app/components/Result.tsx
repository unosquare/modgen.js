import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

interface ResultTypes{
    data: string | undefined | null;
    clickedAdd: ()=>void;
    userResults: string;
    updateUserResults: (input:string)=>void;
    disabled: boolean;
    isLoading:boolean;
}

//results are GPT responses exemplified by the user
export function Result({ data, clickedAdd, userResults, updateUserResults, disabled, isLoading }: ResultTypes){
    useEffect(() => {
        if(typeof data === 'string'){
            updateUserResults(data);
        } 
    },[data]);

    const textAreaClassName = isLoading ?'animate-pulse':'';
    const buttonClassName = disabled ? ' text-gray-400' : ' hover:bg-slate-600';

    return(
        <>
            <h1 className='basis-1/12'>Result</h1>
            <div className='basis-5/12 h-full rounded overflow-auto'>
                <Editor value={userResults}
                        highlight={userResults => highlight(userResults, languages.tsx,'tsx')}
                        onValueChange={userResults=>updateUserResults(userResults)}
                        className= {`min-h-full text-black bg-white basis-5/12 w-full rounded p-2 resize-none ${textAreaClassName}`}
                        padding={7}
                        preClassName='!break-all'
                        textareaClassName='!break-all'
                        disabled={disabled}
                        placeholder='Input a result...'
                />
            </div>
            <div className='basis-1/12'>
                <button type='button' 
                        className={`py-2 px-2 rounded ${buttonClassName}`}
                        onClick={()=>clickedAdd()}
                        disabled={disabled}
                >
                    Add
                </button>
            </div>
        </>        
    )
}

export default Result;