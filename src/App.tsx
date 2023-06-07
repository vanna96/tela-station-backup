import React from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import { CookiesProvider } from 'react-cookie';
import Router from './routes'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'
import { ThemContextProps, ThemeContext, useThemeContext } from './contexts/index';
import { ToggleStateContextProvider } from './contexts/toggleStateContext';

const queryClient = new QueryClient();
const sessionStoragePersistor = createWebStoragePersistor({
  storage: window.sessionStorage,
});

persistQueryClient({
  queryClient,
  persistor: sessionStoragePersistor,
})


const App = () => {
  const myContextValue = useThemeContext();
  React.useEffect(() => {
    myContextValue.setTheme(localStorage.getItem('theme') as ThemContextProps);
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ThemeContext.Provider value={myContextValue}>
          <ToggleStateContextProvider>
            <Router />
          </ToggleStateContextProvider>
        </ThemeContext.Provider>
      </CookiesProvider>
    </QueryClientProvider >
  );
}

export default App;