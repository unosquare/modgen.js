'use client'
import React, {useState} from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "react-query";
import OpenAI from 'openai';
import { userInputStore } from '@/store/inputStore';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

export default function Home() {
  //Zudstand for the input of the user
  const[userInputs, updateUserInput] = userInputStore((state) => [state.userInputs, state.updateUserInput]);
  const updateUserInputHere = (event:any)=> updateUserInput(event.target.value);
  
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
      <div className='flex flex-row text-xl justify-center py-40'>
        <div className='px-16'>
          <h1>Input something</h1>
          <textarea className="h-30 text-black h-40 w-50" 
                    value={userInputs} 
                    onChange={ updateUserInputHere }
          /> <br />
          <button onClick={send} type='button' className='hover:bg-red-800 py-2 px-2' >Send</button><br />
        </div>

        <div className='px-16'>
          <h1 className='' >GPT Response:</h1><br />
          <p >{data}</p>     
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

