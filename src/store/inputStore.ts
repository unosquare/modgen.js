import {create} from 'zustand';

interface InputStore{
    userInputs: string;
    userResults:string;
    updateUserInput: (input:string) => void;
    updateUserResults: (input:string) => void;
}

export const userInputStore = create<InputStore>((set)=>
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

export interface ShotsTypes {
    input: string, 
    result: string
}

interface ArrInterface{
    examples: ShotsTypes[];
    updateUserInputArr: (input:ShotsTypes)=>void;
    deleteUserInputArr: ()=>void;
}

//store for array that stores user's input and results.
//these are the examples that are fed to GPT. 
export const userInputsArr = create<ArrInterface>((set)=>({
    examples: [],
    updateUserInputArr: (input:ShotsTypes)=> set((status:ArrInterface)=>({
        examples:[...status.examples, {input: input.input, result: input.result}]
    })),
    deleteUserInputArr:() => set((status:any)=>{
        status.examples = [];
        return status.examples;
    })    
}))