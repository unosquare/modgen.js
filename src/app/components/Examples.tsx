import { ShotsTypes, userInputsArr } from '@/store/inputStore';
import Shots from './Shots';
// import ButtonsEx from './ExamplesButtons';

interface ExampleTypes {
    send: (examples: ShotsTypes[], lastPrompt: string) => Promise<void>;
    isLoading: boolean;
}

// examples are built with one user input and result
const Examples = ({ send, isLoading }: ExampleTypes) => {
    const [deleteUserInputArr, examples, userInputs, updateUserInput, updateUserResults] = userInputsArr((state) => [
        state.deleteUserInputArr,
        state.examples,
        state.userInputs,
        state.updateUserInput,
        state.updateUserResults,
    ]);

    // const handleDeleteAll = () => {
    //     deleteUserInputArr();
    //     updateUserInput('');
    //     updateUserResults('');
    // };

    // const onClickHandler = async () => {
    //     await send(examples, userInputs);
    // };

    // 1 shot minimun must be added to send a response request to GPT
    // const disabled = !(examples.length >= 1 && userInputs !== '' && !isLoading);
    // const classNameForSend = disabled ? ' text-gray-400' : ' hover:bg-yellow-800';
    // const classNameForButton = isLoading ? ' text-gray-400' : ' hover:bg-red-900';

    return (
        <div className='flex flex-col h-full grow border border-gray-700'>
            <h1 className='basis-[2%] ml-2'>Examples</h1>
            <div className='basis-[98%] bg-white text-black overflow-y-auto grow'>
                <Shots examples={examples} />
            </div>
            {/* <ButtonsEx
                handleDeleteAll={handleDeleteAll}
                disabled={disabled}
                classNameForButton={classNameForButton}
                classNameForSend={classNameForSend}
                isLoading={isLoading}
                onClickHandler={onClickHandler}
            /> */}
        </div>
    );
};

export default Examples;
