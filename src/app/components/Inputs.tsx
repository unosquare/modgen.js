import Model from './Model';
import Result from './Result';
import Container from './Container';
import { userInputsArr } from '../../store/inputStore';

interface InputsType {
    data: string | undefined | null;
    isLoading: boolean;
}

const Inputs = ({ data, isLoading }: InputsType) => {
    const [updateUserInputArr, userInput, updateUserInput, userResults, updateUserResults] = userInputsArr((state) => [
        state.updateUserInputArr,
        state.userInputs,
        state.updateUserInput,
        state.userResults,
        state.updateUserResults,
    ]);

    const clickedAdd = () => {
        if (userInput.trim() !== '' && userResults.trim() !== '') {
            updateUserInputArr({ input: userInput, result: userResults });
            updateUserInput('');
            updateUserResults('');
        }
    };

    return (
        <Container className='md:max-h-96 lg:max-h-[30rem] xl:max-h-[36rem] 2xl:max-h-[50rem] min-[2000px]:max-h-[64.7rem] min-[3000px]:max-h-[132rem] w-7/12'>
            <Model userInput={userInput} updateUserInput={updateUserInput} disabled={isLoading} />
            <Result
                data={data}
                clickedAdd={clickedAdd}
                userResults={userResults}
                updateUserResults={updateUserResults}
                disabled={isLoading}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default Inputs;
