import { FoodCatalog } from './components/FoodCatalog';
import { Layout } from './components/Layout';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Layout>
      <FoodCatalog />
      <Toaster />
    </Layout>
  );
}

export default App;
