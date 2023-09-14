import React, {useRef} from "react";
import { userInputsArr, userInputStore} from '@/store/inputStore';

interface ModelParameters{
    value: string;
    onChange: (event:any)=>void;
}

//model are the inputs from the user, these are part of the prompt
export function Model({value, onChange}:ModelParameters){

    return(
        <>
            <h1>Input something</h1>
            <textarea name="" 
                      id="input-model-alwaysActive" 
                      value={value}
                      onChange={onChange}
                      className="text-black h-44 w-[40rem] rounded resize-none p-2" 
            >
            </textarea> <br />

        </>
    )
}

interface ResultTypes{
    data: string | undefined | null;
    value: string;
    onChange: (event:any)=>void;
}

//results are GPT responses exemplified by the user
export function Result({data, value, onChange}: ResultTypes){
    const[userInputs, 
        updateUserInput, 
        updateUserResults, 
        userResults] = userInputStore((state) => [state.userInputs, 
                                                  state.updateUserInput, 
                                                  state.updateUserResults, 
                                                  state.userResults]);
    const [updateUserInputArr] = userInputsArr((state)=> [state.updateUserInputArr]);

    const updateShots = ()=>{
        updateUserInputArr({input: userInputs, result:userResults});
        updateUserInput("");
        updateUserResults("");
    }
    const clickedAdd = ()=>{
        console.log(userInputs);
        
        if(userInputs.trim() != '' && userResults.trim() != ''){
            updateShots(); 
        }
    }

    return(
        <>
            <h1 className='' >Results:</h1>
            {
            typeof(data) == 'string' ?
                <textarea name="" 
                        id="non-writable-TAResult"           
                        value={data}        
                        className="text-black h-44 w-[40rem] resize-none rounded p-2" 
                ></textarea>
            :                   
                <textarea name="" 
                        // ref={inputRef}
                        id="writable-TAResult"
                        value={value}
                        onChange={onChange}               
                        className="text-black h-44 w-[40rem] resize-none rounded p-2" 
                ></textarea>

            } <br />
            <button type='button' 
                    className='hover:bg-slate-600 py-2 px-2 rounded border-slate-300'
                    onClick={clickedAdd}
            >
                Add
            </button>
        </>        
    )
}

interface ExampleTypes{
    send: ()=>void;
}

//examples are built with one user input and result
export function Examples({send}: ExampleTypes){

    const [deleteUserInputArr] = userInputsArr((state)=> [state.deleteUserInputArr]);

    return(        
        <>
            <h1>Examples</h1>
            <div className="h-96 w-[25rem] bg-white  text-black rounded overflow-auto" >
                <Shots/>
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
                </button><br />
            </div>
        </>
    )
}

//shots are a single example
function Shots(){
    
    const [examples] = userInputsArr((state)=> [state.examples]);
    const cant:number = Object.keys(examples).length;

    return(
            
        cant > 0 ?  
            Object.entries(examples).map(([key, value]) => (
                    <React.Fragment key={key}>
                        <div className="flex flex-row bg-slate-300 m-2 p-3 rounded text-sm">
                            <code className="basis-1/2 max-h-44 overflow-auto mr-3">
                                {value.input}
                            </code>
                            <code className="basis-1/2 max-h-44 overflow-auto"> 
                                {value.result}
                            </code> 
                            <br/>
                        </div>
                    </React.Fragment>
            ))
        :
            <div className="flex flex-row m-2 p-3 rounded text-gray-200 justify-center">
                <code>No examples registered</code>                
            </div>
            
    )
}


    