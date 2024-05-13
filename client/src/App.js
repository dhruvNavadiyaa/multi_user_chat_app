import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/Home' Component={Home}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;