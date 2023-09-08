import {create} from 'zustand';

interface inputStore{
    userInputs: string,
    updateUserInput: (input:string) => void
}

export const userInputStore = create<inputStore>((set)=>
({
    userInputs: "",
    updateUserInput:(input: string) => set(()=>({
        userInputs: input
    }))
}))