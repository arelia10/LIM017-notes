import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName:'',
    });
    const { signup } = useAuth();

    const navigate = useNavigate();

    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(user.email, user.password, user.displayName);
            navigate("/Login")
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="fountRegister">
            <div className="containerRegister">
            {<img className="register"
              src={require("../componentes/img/register.png")}
              alt="lovenotes"/>}
            {error && <p>{}</p>}
            <form className="contentRegister" onSubmit={handleSubmit}>
            <p className='registrate'>Regístrate</p>
            <p id='nick' ><b className='nickname'>Nickname</b></p>
            <label className='imput-box'>
            <input type=''  name="displayName" placeholder="" onChange={handleChange} />
            </label>
            <p className='email'><b className='email'>Email</b></p>
                <label className='imput-box'>
                <input type="email" name="email" placeholder="" onChange={handleChange} />
                </label>
            <p className='password'><b className='password'>Password</b></p>
                <label className='imput-box'>
                <input type="password" name="password" id="password" placeholder="" onChange={handleChange} />
                </label> 
                <button className='btnregister'>Crear Cuenta</button>
            </form>
            </div>
        </div>
    )
};