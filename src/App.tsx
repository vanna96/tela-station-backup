
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import { CookiesProvider } from 'react-cookie';
import Router from './routes'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <Router />
    </CookiesProvider>
  </QueryClientProvider>
)

export default App;