import { useNavigate } from 'react-router-dom';
import React, {useState}from 'react';
import { useFormik } from 'formik';
import { formvalid } from './App';
import Button from '@mui/material/Button';


export function Login() {
  const navigate = useNavigate();
  const [invalid,setinvalid]= useState(false)
  const form = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formvalid,
    onSubmit: (values) => {
      console.log(values);
      fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(res => {
        if (res.msg == "invalid") {
            setinvalid(true)
        } else {
          localStorage.setItem("token", res.token);
          navigate("/home")
        }
      });
    }
  });
  const style={
    width:"200px"
  }

  return (
    <div >
      <form onSubmit={form.handleSubmit} className="form">
      <label>email</label>
        <input onChange={form.handleChange} type='email' name="email" style ={style} />
        {invalid?"invalid cridential":""}
        <label>password</label>
        <input onChange={form.handleChange} onBlur={form.handleBlur} type='password' 
        style ={style} name='password' />
        {form.errors.password && form.touched.password ? form.errors.password : ""}
  
        <Button variant="contained" style={style} >submit</Button>
      </form>
      <div className="form">
      
      <Button variant="contained" style={style} onClick={() => navigate("/signin")}>sign in</Button>
      <Button variant="contained" style={style} onClick={() => navigate("/fsd")}>forgot password</Button>
      
      </div>
    </div>
  );
}
