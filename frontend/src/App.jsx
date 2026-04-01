import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';

const App = () => (
  <div className="flex min-h-screen flex-col bg-transparent text-slate-900 transition-colors duration-500 dark:text-white">
    <Navbar />
    <main className="flex-1 pt-24 md:pt-28">
      <Home />
    </main>
    <Footer />
  </div>
);

export default App;
