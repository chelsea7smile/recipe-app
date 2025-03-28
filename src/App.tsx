import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { RecipeDetailPage } from '@/pages/RecipeDetailPage';
import { FavoritesPage } from '@/pages/FavoritesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
