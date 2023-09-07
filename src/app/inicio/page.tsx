'use client'
import React, {useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
//openai
import OpenAI from 'openai';

console.log(process.env);
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true // defaults to process.env["OPENAI_API_KEY"]
});

export default function Home() {
  //for textarea
  const [userInput, setUserInput] = useState('');
  const onChangeText = (event:any) =>setUserInput(event.target.value);
    
  //send request to gpt after button is pressed
  const [enabled, setEnabled] = useState(false);
  const sendRequest = ()=>gptQuery(userInput);

  const { data, status } = useQuery('data', sendRequest, {
    enabled: enabled
  }); 

  //check status of the request
  if(status === 'loading'){
    return <p>Loading...</p> 
  }

  if(status === 'error'){
    return <p>Error</p>
  }
  
  // console.log(data);  
// data.map((element:any)=>(<li key={element.index}>{element.message.content}</li> ))
  return(
    <>
      <h1>Input something</h1>
      <textarea value={userInput} onChange={onChangeText}/><br />
      <button onClick={() => setEnabled(true)} type='button'>Send</button><br />
      <h1>GPT Responses:</h1><br />
      {
        data?.forEach((element:any) => {
          <p>{element}</p>
        })
      }
      
    </>
  )
}

async function gptQuery(input:string) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": input}],
  });
  console.log(chatCompletion.choices);
  let resultados: Array<string> = [];
  for (let i = 0; i < chatCompletion.choices.length; i++) {
    const element = chatCompletion.choices[i].message.content;
    resultados.push(element!);    
  }
  console.log(resultados);
  
  return resultados;
}

