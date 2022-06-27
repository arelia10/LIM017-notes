import { useState } from "react";
import { useAuth } from "../context/authContext";
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
  const { login, loginWhitGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleSignin = async () => {
    try {
      await loginWhitGoogle();
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
              placeholder="Email"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
            <label htmlFor="password"></label>
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
            <p class="ingresoGoogle">O bien ingresa con...</p>
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
