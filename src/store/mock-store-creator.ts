import { type StateCreator } from 'zustand';
import defaultExamples from '../app/examples.json';

export interface ShotsTypes {
    input: string;
    result: string;
}

export interface ArrInterface {
    examples: ShotsTypes[];
    updateUserInputArr: (input: ShotsTypes) => void;
    deleteUserInputArr: () => void;
    userInputs: string;
    userResults: string;
    updateUserInput: (input: string) => void;
    updateUserResults: (input: string) => void;
    loadDefaultExample: () => void;
}

export const exampleOne = (): ShotsTypes => {
    const rand = Math.floor(Math.random() * 3);
    const sending: ShotsTypes = defaultExamples.examples[rand];
    return sending;
};

// array that stores user's inputs and results.
// these are the examples that are fed to GPT.
export const userInputsArrCreator: StateCreator<ArrInterface> = (set) => ({
    // combined input and result: example
    examples: [defaultExamples.examples[0]],
    updateUserInputArr: (input: ShotsTypes) =>
        set((status: ArrInterface) => ({
            examples: [...status.examples, { input: input.input, result: input.result }],
        })),
    deleteUserInputArr: () => set({ examples: [] }),
    // for single input and result
    userInputs: '',
    userResults: '',
    updateUserInput: (input: string) =>
        set(() => ({
            userInputs: input,
        })),
    updateUserResults: (result: string) =>
        set(() => ({
            userResults: result,
        })),
    loadDefaultExample: () => set({ examples: [exampleOne()] }),
});
