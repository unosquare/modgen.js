interface ResultTypes{
    data: string | undefined | null;
    clickedAdd: ()=>void;
    userResults: string;
    updateUserResults: (input:string)=>void;
}

//results are GPT responses exemplified by the user
export function Result({ data, clickedAdd, userResults, updateUserResults }: ResultTypes){
    const resultArea = () => {
        if(typeof data === 'string'){
            return(
                <textarea id="non-writable-TAResult"           
                          value={data}        
                          className="text-black h-44 w-[40rem] resize-none rounded p-2" 
                ></textarea>
            )
        }else{
            return(
                <textarea id="writable-TAResult"
                          value={userResults}
                          onChange={(event)=>updateUserResults(event.target.value)}               
                          className="text-black h-44 w-[40rem] resize-none rounded p-2" 
                ></textarea>
            )
        }
    };

    return(
        <>
            <h1>Results:</h1>
            <div>{resultArea()}</div>
            <div>
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