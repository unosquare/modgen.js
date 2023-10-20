import { userInputStore, userInputsArr } from '@/store/inputStore';
import Shots from './Shots';

interface ExampleTypes{
    send: (examples:any[], lastPrompt:string)=>void;
}

//examples are built with one user input and result
export function Examples({ send }: ExampleTypes){

    const [deleteUserInputArr,           
           examples] = userInputsArr((state)=> [state.deleteUserInputArr,
                                                state.examples]);
    const [userInputs] = userInputStore((state)=>[state.userInputs]);
    //1 shot minimun must be added to send a response request to GPT                                            
    const disabled = !(examples.length >= 1 && userInputs !== '');

    return(        
        <>
            <h1 className="flex-inital basis-1/12 ml-0 pr-0 ">Examples</h1>
            <div className="flex flex-col justify-start items-stretch basis-10/12 w-full bg-white text-black rounded overflow-y-auto">
                <Shots examples={examples}/>
            </div>
            <div id="examples-btns" className="flex flex-row justify-start flex-initial basis-1/12">
                <button type="button" 
                        className='flex-initial hover:bg-red-900 py-2 px-2 rounded mr-5 '
                        onClick={deleteUserInputArr}
                >
                    Delete all
                </button>
                <button onClick={()=>send(examples, userInputs)} 
                        type='button' 
                        className='flex-initial hover:bg-yellow-800 py-2 px-2 rounded'
                        disabled={disabled}
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default Examples;