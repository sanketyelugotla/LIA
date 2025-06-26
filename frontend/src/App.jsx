import AppRoutes from './routes';
import { useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Alert from './components/UI/Alert';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto">
        <Alert />
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;