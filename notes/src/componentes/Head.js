import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";

export function Head() {

    const {user,logOut, loading} = useAuth ()
    const navigate = useNavigate()
  
    const handleLogout = async () => {
      try {
      await logOut()
      navigate('/Login');
    } catch (error) {
      console.error(error)
    }
  };
  
    if (loading) return <h1>loading</h1>
  
    return (
      <header className='containerHead'>
       {<img
              className="iconHead"
              src={require("../componentes/img/logohead.png")}
              alt="lovenotes"
            />
          } 
      <div className='ContainerUsers'>
       <h3 className='User'>  Welcome, {user.displayName} </h3>
      </div>
      <div className='ContainerOut'>
      <button className='btnOut' onClick={handleLogout}>
      {<img
              className="iconOut"
              src={require("../componentes/img/Out.png")}
              alt="lovenotes"
            />
          } 
      </button>
      </div>
  
      </header>
    );
  }
  export default Head; 