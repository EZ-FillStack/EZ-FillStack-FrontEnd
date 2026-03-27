import RootRoutes from './routes/RootRoutes';
import { useAuthInit } from '@/hooks/auth/useAuthInit';

function App() {
  useAuthInit();

  return <RootRoutes />;
}

export default App;
