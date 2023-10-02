import React,{ useEffect } from "react";
import { userInputsArr, ShotsTypes } from '@/store/inputStore';

interface ShotsType{
    examples: ShotsTypes[];
}

//shots are a single example
function Shots({examples}:ShotsType){
    
    // const examples = userInputsArr((state)=> state.examples);

    const renderedUserExamples = () =>{
        if(!(examples.length > 0) ){
            return(
                <div className="flex flex-row m-2 p-3 rounded text-gray-200 justify-center">
                    <code>No examples registered</code>                
                </div>
            )             
        }else{
            return examples.map((shot, index)=>{
                console.log(shot);
                return(
                    <div className="flex flex-row bg-slate-300 m-2 p-3 rounded text-sm" 
                         key={index}
                    >
                        <code className="basis-1/2 max-h-44 overflow-auto mr-3">
                            {shot.input}
                        </code>
                        <code className="basis-1/2 max-h-44 overflow-auto"> 
                            {shot.result}
                        </code>
                    </div>
                )
            });
        }
        
    };

    return(    
        <>
            { renderedUserExamples() }
        </>
    )
}

export default Shots;