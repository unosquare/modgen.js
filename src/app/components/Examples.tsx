import { userInputsArr, userInputStore } from '@/store/inputStore';
import Shots from './Shots';

interface ExampleTypes{
    send: (examples:any[])=>void;
}

//examples are built with one user input and result
export function Examples({send}: ExampleTypes){

    const [deleteUserInputArr,           
           examples] = userInputsArr((state)=> [state.deleteUserInputArr,
                                                state.examples]);
    //3 shots minimun must be added to send a response request to GPT                                            
    const disabled = examples.length >= 3 ? false : true;

    return(        
        <>
            <h1>Examples</h1>
            <div className="h-96 w-[25rem] bg-white  text-black rounded overflow-auto flex-initial" >
                <Shots examples={examples}/>
            </div>
            <div id="examples-btns" >
                <button type="button" 
                        className='hover:bg-red-900 py-2 px-2 mt-2 rounded mr-5'
                        onClick={deleteUserInputArr}
                >
                    Delete all
                </button>
                <button onClick={()=>send(examples)} 
                        type='button' 
                        className='hover:bg-yellow-800 py-2 px-2 rounded'
                        disabled={disabled}
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default Examples;