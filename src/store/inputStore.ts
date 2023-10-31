import { create } from 'zustand';
export interface ShotsTypes {
    input: string, 
    result: string
}

interface ArrInterface{
    examples: ShotsTypes[];
    updateUserInputArr: (input:ShotsTypes)=>void;
    deleteUserInputArr: ()=>void;
    userInputs: string;
    userResults:string;
    updateUserInput: (input:string) => void;
    updateUserResults: (input:string) => void;
}

//array that stores user's inputs and results.
//these are the examples that are fed to GPT. 
export const userInputsArr = create<ArrInterface>((set)=>({
    //combined input and result: example
    examples: [],
    updateUserInputArr: (input:ShotsTypes)=> set((status:ArrInterface)=>({
        examples:[...status.examples, {input: input.input, result: input.result}]
    })),
    deleteUserInputArr:() => set({examples: []}),
    //for single input and result
    userInputs: '',
    userResults: '',
    updateUserInput:(input: string) => set(()=>({
        userInputs: input
    })),
    updateUserResults:(result: string) => set(()=>({
        userResults: result
    }))    
}))