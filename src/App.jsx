import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import './App.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App