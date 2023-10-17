import Model from './Model';
import Result from './Result';
import Container from './Container';
import { userInputsArr, userInputStore } from '../../store/inputStore';

interface InputsType{
    data: string | undefined | null;
    isLoading: boolean;
}

function Inputs({ data, isLoading }:InputsType){
    const [updateUserInputArr, examples] = userInputsArr((state)=> [state.updateUserInputArr,
                                                                    state.examples]);
    const [userInput, 
           userResults, 
           updateUserInput,
           updateUserResults] = userInputStore((state)=>[state.userInputs, 
                                                         state.userResults,
                                                         state.updateUserInput,
                                                         state.updateUserResults]);   

    const readyToSend = examples.length > 0 && examples[examples.length-1].result === '' ? true : false;     

    const clickedAdd = () => { 
        if((userInput.trim() !== '' && userResults.trim() !== '')){
            updateUserInputArr({input: userInput, result: userResults});
            updateUserInput('');
            updateUserResults('');
        }
    };    

    return(
        <Container className="w-2/3">
            <Model userInput={userInput} updateUserInput={updateUserInput} disabled={readyToSend}/>
            <Result data={data} 
                    clickedAdd={clickedAdd} 
                    userResults={userResults} 
                    updateUserResults={updateUserResults}
                    disabled={readyToSend}
                    isLoading={isLoading}
            />
        </Container>
    )
}

export default Inputs;