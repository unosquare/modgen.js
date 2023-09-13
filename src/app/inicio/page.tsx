'use client'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "react-query";
import OpenAI from 'openai';
import { userInputStore } from '@/store/inputStore';
import {Examples, Result, Model} from './components';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

export default function Home() {
  //Zudstand for the input of the user
  const[userInputs, 
        updateUserInput, 
        updateUserResults, 
        userResults] = userInputStore((state) => [state.userInputs, 
                                                  state.updateUserInput, 
                                                  state.updateUserResults, 
                                                  state.userResults]);
  const updateUserInputHere = (event:any)=> updateUserInput(event.target.value);
  const updateUserResultsHere = (event:any)=> updateUserResults(event.target.value);
  
  //react query request, error handlers and fetch trigger
  const { data, 
          isError, 
          isLoading, 
          mutateAsync } = useMutation(
                                        () => gptQuery(userInputs)
                                     );
  
  //send request to gpt after button is pressed
  async function send(){
    await mutateAsync();
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

        <div className='mr-7 bg-gray-400 px-5 py-3 rounded-lg bg-opacity-20 backdrop-blur-lg
                        hover:shadow-lg hover:shadow-blue-950' >
          <Examples send={send}></Examples>
        </div>

        <div className='flex flex-col px-5 py-3 bg-gray-400 rounded-lg bg-opacity-20 backdrop-blur-lg
                        hover:shadow-lg hover:shadow-blue-950 '>
          <div>
            <Model value={userInputs} onChange={updateUserInputHere}></Model>
          </div>

          <div>
            <Result data={data} value={userResults} onChange={updateUserResultsHere} ></Result>
          </div>
        </div>       

      </div>  
    </>
  )
}

async function gptQuery(input:string) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content":input}],
  });
  console.log(chatCompletion.choices);
  
  return chatCompletion.choices[0].message.content;
}