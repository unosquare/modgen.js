'use client'

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function Home() {
  const {data, status} = useQuery('data', dataFetch);

  if(status === 'loading'){
    return <p>Loading...</p> 
  }

  if(status === 'error'){
    return <p>Error</p>
  }
  
  return (
    <ul>
      {
        data.map((element:any)=>(<li key={element.id}>{element.title}</li> ))
      }
    </ul>
  )
}


async function dataFetch(){
  const data = await fetch('https://fakestoreapi.com/products?limit=5');
  return data.json();
}