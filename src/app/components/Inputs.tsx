import Model from './Model';
import Result from './Result';
import Container from './Container';
import { userInputsArr, userInputStore } from '../../store/inputStore';

interface InputsType{
    data: string | undefined | null;
    isLoading: boolean;
}

function Inputs({ data, isLoading }:InputsType){
    const [updateUserInputArr] = userInputsArr((state)=> [state.updateUserInputArr]);
    const [userInput, 
           userResults, 
           updateUserInput,
           updateUserResults] = userInputStore((state)=>[state.userInputs, 
                                                         state.userResults,
                                                         state.updateUserInput,
                                                         state.updateUserResults]);   

    const clickedAdd = () => { 
        if((userInput.trim() !== '' && userResults.trim() !== '')){
            updateUserInputArr({input: userInput, result: userResults});
            updateUserInput('');
            updateUserResults('');
        }
    };    

    return(
        <Container className="w-7/12">
            <Model userInput={userInput} updateUserInput={updateUserInput} disabled={isLoading}/>
            <Result data={data} 
                    clickedAdd={clickedAdd} 
                    userResults={userResults} 
                    updateUserResults={updateUserResults}
                    disabled={isLoading}
                    isLoading={isLoading}
            />
        </Container>
    )
}

export default Inputs;