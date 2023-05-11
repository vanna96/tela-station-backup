
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import { CookiesProvider } from 'react-cookie';
import Router from './routes'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'

const queryClient = new QueryClient();

const sessionStoragePersistor = createWebStoragePersistor({
  storage: window.sessionStorage,
});

persistQueryClient({
  queryClient,
  persistor: sessionStoragePersistor,
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <Router />
    </CookiesProvider>
  </QueryClientProvider>
)

export default App;