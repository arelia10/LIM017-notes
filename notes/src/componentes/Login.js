import { useState } from "react";
import {  login,loginWithGoogle } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';


export function Login() {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password')
        }
    };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const homeUser=await login(user.email, user.password);
      localStorage.setItem('email', homeUser.user.email);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <div className="fount">
        <div className="container">
          {
            <img
              className="logo"
              src={require("../componentes/img/logo.png")}
              alt="lovenotes"
            />
          }
          {error && <p>{}</p>}
          <form className='content' onSubmit={handleSubmit}>
            <label htmlFor="email "></label>
            <input
              className="userInfo"
              type="email"
              name="email"
              id='email'
              placeholder="Email"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <span className= "eye2" onClick={handleToggle} style={{ color: 'rgba(142, 137, 137, 1)' }}><Icon  icon={icon} size={20} /></span>

            <input
              className="userInfor"
              type={type}
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <br></br>
            <button className="buttonLogin">Iniciar Sesión</button>
            <p className="ingresoGoogle">O bien ingresa con...</p>
            <button className="btngamil" onClick={handleGoogleSignin}>
              {
                <img
                  className="icongmail"
                  src={require("../componentes/img/gmail.png")}
                  alt="lovenotes"
                />
              }
            </button>
            <p className="createLogin">
              ¿No tienes una cuenta?
              <Link className="buttonRegister" to={"/Register"}>
                <u>Regístrate</u>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Login;
