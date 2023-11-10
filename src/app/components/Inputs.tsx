import Model from './Model';
import Result from './Result';
import Container from './Container';
import { userInputsArr } from '../../store/inputStore';

interface InputsType {
    data: string | undefined | null;
    isLoading: boolean;
}

const Inputs = ({ data, isLoading }: InputsType) => {
    const [userInput, updateUserInput, userResults, updateUserResults] = userInputsArr((state) => [
        state.userInputs,
        state.updateUserInput,
        state.userResults,
        state.updateUserResults,
    ]);

    return (
        <Container className='flex flex-row w-[115vh] max-h-[28vh] grow'>
            <Model userInput={userInput} updateUserInput={updateUserInput} disabled={isLoading} />
            <Result
                data={data}
                userResults={userResults}
                updateUserResults={updateUserResults}
                disabled={isLoading}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default Inputs;
