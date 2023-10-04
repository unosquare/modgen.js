'use client'
import { useMutation } from "react-query";
import OpenAI from 'openai';
import Examples from './components/Examples';
import Container from './components/Container';
import { insertExamples } from './promptTemplates';
import Inputs from './components/Inputs';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

export default function Home() {
  //react query request, error handlers and fetch trigger
  const { data, 
          isError, 
          isLoading, 
          mutateAsync } = useMutation(
                                        (examples:any[]) => gptQuery(insertExamples(examples))
                                     );
  
  //send request to gpt after button is pressed
  async function send(examples:any[]){
    await mutateAsync(examples);
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

        <Inputs data={data}/>        
      </div>  
    </>
  )
}

async function gptQuery(input:any[]) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: input,
  });
  
  return chatCompletion.choices[0].message.content;
}