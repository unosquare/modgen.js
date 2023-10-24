import { ShotsTypes } from '@/store/inputStore';
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface ShotsType{
    examples: ShotsTypes[];
}

//shots are a single example
function Shots({ examples }:ShotsType){
    useEffect(() => {
        Prism.highlightAll();
    },[examples])
      
    if(!(examples.length > 0) ){
        return(
            <div className="flex items-center justify-center content-center rounded text-gray-200 h-full flex-auto w-full">
                <code className="select-none ">No examples registered</code>                
            </div>
        )             
    }else{
        return examples.map((shot, index)=>{
            return(
                <div className="flex flex-row bg-slate-300 m-2 p-3 rounded text-xs max-h-44 shadow-lg gap-1 hide-scroll-bar-me-setting-big" 
                     key={index}
                >
                    <pre className="overflow-auto basis-2/5 grow whitespace-pre-wrap hide-scroll-bar-me-setting-big">
                        <code className="language-tsx">
                            {shot.input}
                        </code>                        
                    </pre>
                    {/* <div className="bg-slate-100 basis-1/5 max-w-[2px] rounded "/> */}
                    <pre className="overflow-auto ml-1 basis-2/5 grow hide-scroll-bar-me-setting-big">
                        <code className="language-tsx"> 
                            {shot.result}
                        </code>
                    </pre>
                </div>
            )
        });
    }
}

export default Shots;