import { Routes, Route,BrowserRouter, } from 'react-router-dom';
import React from'react';
import {Home} from './componentes/Home'
import {Login} from './componentes/Login'
import {Register} from './componentes/Register'
import {AuthProvider} from './context/authContext'
import {ProtectRoute} from './componentes/protecRoute'
import { Head } from './componentes/Head'
import './index.css';
import './styles/Login.css'; 
import './styles/Register.css';
import './styles/Home.css';
import './styles/Head.css';

function App() {
  return (
    <div>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/' element={<ProtectRoute><Head /> <Home /></ProtectRoute>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </div>

);
}
export default App;





