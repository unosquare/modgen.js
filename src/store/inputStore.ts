import {create} from 'zustand';

interface inputStore{
    userInputs: string,
    userResults:string,
    updateUserInput: (input:string) => void,
    updateUserResults: (input:string) => void
}

export const userInputStore = create<inputStore>((set)=>
({
    userInputs: "",
    userResults: "",
    updateUserInput:(input: string) => set(()=>({
        userInputs: input
    })),
    updateUserResults:(result: string) => set(()=>({
        userResults: result
    }))
}))

interface arrInterface{
    examples: object[],
    updateUserInputArr: (input:object)=>void,
    deleteUserInputArr: ()=>void
}

//store for array that stores user's input and results.
//these are the examples that are fed to GPT. 
export const userInputsArr = create<arrInterface>((set)=>({
    examples: [],
    updateUserInputArr: (input:object)=> set((status:arrInterface)=>({
        examples: [...status.examples, input]
    })),
    deleteUserInputArr:() => set((status:any)=>{
        status.examples = []
        return status.examples;
    })    
}))