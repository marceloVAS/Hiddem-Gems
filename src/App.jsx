import AuthFinal from './components/AuthFinal';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <>
    <Header />
    <div className='container'>
      <AuthFinal/>
    </div>
    </>
  );
}