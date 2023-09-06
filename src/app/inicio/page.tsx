'use client'

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function Home() {
  const {data, status} = useQuery('data', pruebaUno);

  if(status === 'loading'){
    return <p>Loading...</p> 
  }

  if(status === 'error'){
    return <p>Error</p>
  }

  console.log(data);
  
  return (

    /**Ejemplo de abajo con la fakestoreAPI */
    <ul>
      {
        data.map((element:any)=>(<li key={element.id}>{element.title}</li> ))
      }
    </ul>
  )
}

async function pruebaUno(){
  //prueba sencilla de react query, fakestore api es solo una api para comprobar el funcionamiento de reactQuery
  const data = await fetch('https://fakestoreapi.com/products?limit=5');
  // const data = await fetch(/*url de la API*/ );


  return data.json();
}