"use client";//use client es para solicionar posibles errores que las librerias no soportan en modo servidor
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  //boilerplate de la documentacion de react query para incializar y heredar las propiedades
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}