import Model from './Model';
import Result from './Result';
import Container from './Container';
import { userInputsArr } from '../../store/inputStore';

interface InputsType {
    data: string | undefined | null;
    isLoading: boolean;
    modeUp: boolean;
}

const Inputs = ({ data, isLoading, modeUp }: InputsType) => {
    const [userInput, updateUserInput, userResults, updateUserResults] = userInputsArr((state) => [
        state.userInputs,
        state.updateUserInput,
        state.userResults,
        state.updateUserResults,
    ]);

    return (
        <Container className='flex flex-row w-7/12 grow'>
            <Model userInput={userInput} updateUserInput={updateUserInput} disabled={isLoading} />
            <Result
                data={data}
                userResults={userResults}
                updateUserResults={updateUserResults}
                disabled={isLoading || modeUp}
                isLoading={isLoading}
                modeUp={modeUp}
            />
        </Container>
    );
};

export default Inputs;
