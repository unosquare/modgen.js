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

export type cicleShotsTypes = Record<number, ShotsTypes>;

interface ArrInterface{
    examples: cicleShotsTypes;
    updateUserInputArr: (input:ShotsTypes)=>void;
    deleteUserInputArr: ()=>void;
}

//store for array that stores user's input and results.
//these are the examples that are fed to GPT. 
let index:number = 0;
export const userInputsArr = create<ArrInterface>((set)=>({
    examples: {},
    updateUserInputArr: (input:ShotsTypes)=> set((status:ArrInterface)=>{
        status.examples[index] = {input: input.input, result: input.result};
        index++;
        return {examples: status.examples}
    }),
    deleteUserInputArr:() => set((status:any)=>{
        status.examples = {}
        index = 0;
        return status.examples;
    })    
}))