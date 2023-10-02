import { userInputsArr } from '@/store/inputStore';
import Shots from './Shots';
import { useEffect } from 'react';

interface ExampleTypes{
    send: ()=>void;
}

//examples are built with one user input and result
export function Examples({send}: ExampleTypes){

    const [deleteUserInputArr, 
           examples] = userInputsArr((state)=> [state.deleteUserInputArr,
                                                state.examples]);

    return(        
        <>
            <h1>Examples</h1>
            <div className="h-96 w-[25rem] bg-white  text-black rounded overflow-auto" >
                <Shots examples={examples}/>
            </div>
            <div id="examples-btns" >
                <button type="button" 
                        className='hover:bg-red-900 py-2 px-2 mt-2 rounded mr-5'
                        onClick={deleteUserInputArr}
                >
                    Delete all
                </button>
                <button onClick={send} 
                        type='button' 
                        className='hover:bg-yellow-800 py-2 px-2 rounded' 
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default Examples;