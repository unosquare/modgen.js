import { ShotsTypes } from '@/store/inputStore';

interface ShotsType{
    examples: ShotsTypes[];
}

//shots are a single example
function Shots({ examples }:ShotsType){

    if(!(examples.length > 0) ){
        return(
            <div className="flex items-center justify-center content-center rounded text-gray-200 h-full flex-auto w-full">
                <code className="select-none ">No examples registered</code>                
            </div>
        )             
    }else{
        return examples.map((shot, index)=>{
            if(!shot.result || shot.result === ''){
                return(
                    <div className="flex flex-col justify-start items-center bg-slate-800 m-2 p-3 rounded text-sm text-white" 
                            key={index}
                    >
                        <code className="max-h-44 overflow-auto">
                            {shot.input}
                        </code>
                    </div>
                )             
            }
            return(
                <div className="flex flex-row bg-slate-300 m-2 p-3 rounded text-sm max-h-44" 
                     key={index}
                >
                    <code className="overflow-auto basis-2/5 grow">
                        {shot.input}
                    </code>
                    <div className="bg-slate-100 basis-1/5 max-w-[2px] rounded"/>
                    <code className="overflow-auto basis-2/5 grow ml-1"> 
                        {shot.result}
                    </code>
                </div>
            )
        });
    }
}

export default Shots;