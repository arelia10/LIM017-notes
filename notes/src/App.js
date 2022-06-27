import { Routes, Route } from 'react-router-dom';
import {Home} from './componentes/Home'
import {Login} from './componentes/Login'
import {Register} from './componentes/Register'
import {AuthProvider} from './context/authContext'
import {ProtectRoute} from './componentes/protecRoute'
import './index.css';
import './styles/Login.css'; 
import './styles/Register.css';

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
      <Route path="/" element={<ProtectRoute>
      <Home/></ProtectRoute> }/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
    </Routes>
    </AuthProvider>
    </div>

);
}
export default App;





