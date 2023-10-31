'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}