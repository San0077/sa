import './App.css';
import  { Routes,Route,Link,Navigate,useNavigate} from 'react-router-dom';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Login } from './Login';
import { Fsd } from './Fsd';
import { useEffect } from 'react';
import Button from '@mui/material/Button';


export const formvalid =yup.object({
  email:yup.string().required(),
  password:yup.string().required().min(8,"password must be strong")
})

function App() {
  const navigate = useNavigate();
 const logout=()=>{
       localStorage.removeItem("token");
       navigate("/login")
 }


          return(
            <div>
                 <nav>
                   <li>
                       <Link to="/login">login</Link>
                    </li>
                    <li>
                       <Link to="/home">home</Link>
                    </li>
                    <button onClick={logout}>logout</button>
                  
                 </nav>
                 <Routes >
                  <Route path="/home" element={<RequiredAuth> <Home/></RequiredAuth> }></Route>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/fsd" element={<Fsd/>}></Route>
                  <Route path="/signin" element={<Signin/>}></Route>
                 </Routes>
            </div>
            
          )
 
}
function RequiredAuth({children}){
  const token = localStorage.getItem("token")
  return token ? children : <Navigate replace to ="/login"/>       
  
}
function Home(){
  useEffect(()=>{
    fetch("http://localhost:4000/home",{
      method :"GET",
      headers:{
        "x-auth-token":localStorage.getItem("token")
      }
    }).then(res=>res.json()).then(res=>
      {if(res.msg =="hello"){
      
    }else{
      alert("token is not valid")
    }
  }
    )
  },[])
 return(
  <div>
    <h1>hello welcome to our app</h1>
  </div>
 )
}
function Signin(){
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formvalid,
    onSubmit: (values) => {
      console.log(values);
      fetch("http://localhost:4000/signin", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(()=>navigate("/login"))
    }
  });
  const style={
    width:"200px"
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit} className="form">
        <label>email</label>
        <input style={style} onChange={form.handleChange} type='email' name="email" />
        <label>password</label>
        <input style={style} onChange={form.handleChange} onBlur={form.handleBlur} type='password' name='password' />
        {form.errors.password && form.touched.password ? form.errors.password : ""}
        <Button variant="contained" type="submit">sign in</Button>

      </form>
    
    </div>
  );
  
}
export default App;