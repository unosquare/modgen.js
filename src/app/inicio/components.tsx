import React from "react";
import { userInputsArr } from '@/store/inputStore';
import { userInputStore } from '@/store/inputStore';

interface modelParameters{
    value: string,
    onChange: (event:any)=>void,
}

//model are the inputs from the user, these are part of the prompt
export function Model({value, onChange}:modelParameters){

    return(
        <>
            <h1>Input something</h1>
            <textarea name="" 
                      id="" 
                      value={value} 
                      onChange={onChange}
                      className="text-black h-44 w-[40rem] rounded resize-none" 
            >
            </textarea> <br />

        </>
    )
}

interface dataTypes{
    data: string | undefined | null,
    value: string,
    onChange: (event:any)=>void,
}

//results are GPT responses exemplified by the user
export function Result({data, value, onChange}: dataTypes){
    const {userInputs, userResults} = userInputStore();
    const [updateUserInputArr, examples] = userInputsArr((state:any)=> [state.updateUserInputArr, state.examples]);
    const num = examples.length;

    const updateShots = ()=>{    
        let values = {"id":num,"input": userInputs, "results":userResults};
    
        updateUserInputArr(values);
    }

    return(
        <>
            <h1 className='' >Results:</h1>
            {
            typeof(data) == 'string' ?
                <textarea name="" 
                          id=""           
                          value={data}        
                          className="text-black h-44 w-[40rem] resize-none rounded" 
                ></textarea>
            :   
                <textarea name="" 
                          id=""        
                          value={value} 
                          onChange={onChange}               
                          className="text-black h-44 w-[40rem] resize-none rounded" 
                ></textarea>

            } <br />
            <button type='button' 
                    className='hover:bg-slate-600 py-2 px-2 rounded border-slate-300'
                    onClick={updateShots}
            >
                Add
            </button>
        </>        
    )
}

interface helpingInter{
    send: ()=>void
}

//examples are built with one user input and result
export function Examples({send}: helpingInter){

    const deleteUserInputArr = userInputsArr((state:any)=> state.deleteUserInputArr);

    return(        
        <>
            <h1>Examples</h1>
            <div className="h-96 w-[25rem] bg-white  text-black rounded" >
                <Shots></Shots>
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
    
    const examples:object[] = userInputsArr((state:any)=> state.examples);
    const cant:number = examples.length;

    return(
            
        cant > 0 ?
        examples.map((element:any) =>(            
            <React.Fragment key={element.id}>
                <code >{element.input}, {element.results}</code>
                <br />
            </React.Fragment>
        ))
            
        :
        <code>No example registered</code>
            
    )
}


    