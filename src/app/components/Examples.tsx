import { userInputStore, userInputsArr } from '@/store/inputStore';
import Shots from './Shots';

interface ExampleTypes{
    send: (examples:any[], lastPrompt:string)=>void;
    isLoading: boolean;
}

//examples are built with one user input and result
export function Examples({ send, isLoading }: ExampleTypes){

    const [deleteUserInputArr,           
           examples] = userInputsArr((state)=> [state.deleteUserInputArr,
                                                state.examples]);
    const [userInputs] = userInputStore((state)=>[state.userInputs]);
    //1 shot minimun must be added to send a response request to GPT                                            
    const disabled = !(examples.length >= 1 && userInputs !== '' && !isLoading);

    const classNameForSend = disabled ?  ' text-gray-400' : ' hover:bg-yellow-800'; 
    const classNameForButton = isLoading ?  ' text-gray-400' : ' hover:bg-red-900'; 

    return(        
        <>
            <h1 className="flex-inital basis-1/12 ml-0 pr-0 ">Examples</h1>
            <div className="flex flex-col justify-start items-stretch basis-10/12 w-full bg-white text-black rounded overflow-y-auto">
                <Shots examples={examples}/>
            </div>
            <div id="examples-btns" className="flex flex-row justify-start flex-initial basis-1/12">
                <button type="button" 
                        className={`flex-initial  py-2 px-2 rounded mr-5 ${classNameForButton}`}
                        onClick={deleteUserInputArr}
                        disabled={isLoading}
                >
                    Delete all
                </button>
                <button onClick={()=>send(examples, userInputs)} 
                        type='button' 
                        className={`flex-initial py-2 px-2 rounded ${classNameForSend}`}
                        disabled={disabled}
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default Examples;