'use client'
import { useMutation } from "react-query";
import OpenAI from 'openai';
import { userInputStore, ShotsTypes, userInputsArr} from '@/store/inputStore';
import Examples from './components/Examples';
import Result from './components/Result';
import Model from './components/Model';
import Container from './components/Container';
import { insertExamples } from './promptTemplates';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

export default function Home() {

  const [updateUserInputArr, examples] = userInputsArr((state)=> [state.updateUserInputArr,
                                                        state.examples]);

  const clickedAdd = (input:string, result:string)=>{        
    if(input.trim() != '' && result.trim() != ''){
      updateUserInputArr({input, result});
    }
}

  //react query request, error handlers and fetch trigger
  const { data, 
          isError, 
          isLoading, 
          mutateAsync } = useMutation(
                                        () => gptQuery(insertExamples(examples))
                                     );
  
  //send request to gpt after button is pressed
  async function send(){
    console.log(insertExamples(examples));
    // await mutateAsync();
  }

  //check status of the request
  if(isLoading){
    return <p>Loading...</p> 
  }

  if(isError){
    return <p>Error</p>
  }
  
  return(
    <>
      <h1>ModGen.js</h1>
      <div className='flex flex-row text-xl justify-center py-10'>
        <Container className="mr-7">
          <Examples send={send}/>
        </Container>

        <Container className="flex flex-col">
            <Model />

            <Result data={data} clickedAdd={clickedAdd}/ >
        </Container>

      </div>  
    </>
  )
}

async function gptQuery(input:any[]) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: input,
  });
  console.log(chatCompletion.choices);
  
  return chatCompletion.choices[0].message.content;
}