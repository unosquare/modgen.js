import { create } from 'zustand';
export interface ShotsTypes {
    input: string;
    result: string;
}

interface ArrInterface {
    examples: ShotsTypes[];
    updateUserInputArr: (input: ShotsTypes) => void;
    deleteUserInputArr: () => void;
    userInputs: string;
    userResults: string;
    updateUserInput: (input: string) => void;
    updateUserResults: (input: string) => void;
}

const exampleOne: ShotsTypes = {
    input: `const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];`,
    result:
        `const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params: GridValueGetterParams) =>
          ` +
        "\t`${params.row.firstName || ''} ${params.row.lastName || ''}`" +
        `,
        },
      ];`,
};

// array that stores user's inputs and results.
// these are the examples that are fed to GPT.
export const userInputsArr = create<ArrInterface>((set) => ({
    // combined input and result: example
    examples: [exampleOne],
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
}));
