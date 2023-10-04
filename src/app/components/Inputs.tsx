import Model from './Model';
import Result from './Result';
import Container from './Container';
import { userInputsArr, userInputStore } from '../../store/inputStore';

interface InputsType{
    data: string | undefined | null;
}

function Inputs({ data }:InputsType){
    const [updateUserInputArr, examples] = userInputsArr((state)=> [state.updateUserInputArr,
                                                                    state.examples]);
    const [userInput, 
           userResults, 
           updateUserInput,
           updateUserResults] = userInputStore((state)=>[state.userInputs, 
                                                         state.userResults,
                                                         state.updateUserInput,
                                                         state.updateUserResults]);   
                                                         
    const clickedAdd = () => { 
        if((userInput.trim() !== '' && userResults.trim() !== '') ||
           (userInput.trim() !== '' && examples.length >= 3)){

            updateUserInputArr({input: userInput, result: userResults});
            updateUserInput('');
            updateUserResults('');
        }
    }    

    return(
        <Container>
            <Model userInput={userInput} updateUserInput={updateUserInput}/>
            <Result data={data} 
                    clickedAdd={clickedAdd} 
                    userResults={userResults} 
                    updateUserResults={updateUserResults}
            />
        </Container>
    )
}

export default Inputs;