import AuthFinal from './components/AuthFinal';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
    <Header />
    <div className='container pb-5'>
      <AuthFinal/>
    </div>
    <Footer />
    </>
  );
}