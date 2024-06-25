import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import React, { useEffect } from 'react'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from 'react-query' //📍추가

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Theme>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  )
}

export default React.memo(App)
