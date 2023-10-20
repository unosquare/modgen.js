import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

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

    return(
        <>
            <h1 className="basis-1/12">Result</h1>
            <div className="basis-5/12 h-full overflow-auto">
                <Editor value={userResults}
                        highlight={userResults => highlight(userResults, languages.javascript,'javascript')}
                        onValueChange={userResults=>updateUserResults(userResults)}
                        className= {`min-h-full text-black bg-white basis-5/12 w-full rounded p-2 resize-none ${textAreaClassName}`}
                        padding={7}
                        preClassName="!break-all"
                        textareaClassName="!break-all"
                        disabled={disabled}
                        placeholder="Input a result..."
                />
            </div>
            <div className="basis-1/12">
                <button type='button' 
                        className='hover:bg-slate-600 py-2 px-2 rounded border-slate-300'
                        onClick={()=>clickedAdd()}
                >
                    Add
                </button>
            </div>
        </>        
    )
}

export default Result;