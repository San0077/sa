import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '@mui/material/Button';

export function Fsd() {
  var [pass, setpass] = useState();
  var [code, setcode] = useState();
  var [otp, setotp] = useState(false);
  var [otpsend, setotpsend] = useState(true);
  let navigate = useNavigate();
  const confirm = () => {
    fetch("http://localhost:4000/fpw", {
      method: "POST",
      body: JSON.stringify({ email: pass }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => data.json()).then(res => {
      if (res.msg = "autheticating") {
        setotp(true);
        setotpsend(false);
        setcode(res.OTP);
      } else {
      }
    });


  };
  const confirmotp = () => {
    if (pass == code) {
      navigate("/home");
    } else {
      console.log("error");
    }
  };
  return (
    <div>
      <label>enter vaild email</label>
      <input onChange={(e) => {
        setpass(e.target.value);
      }} />
      <Button variant="contained" onClick={confirm} disabled={otp}>sign in</Button>

      <label>enter OTP</label>
      <input onChange={(e) => {
        setpass(e.target.value);
      }} disabled={otpsend} />
      <Button variant="contained" onClick={confirmotp} disabled={otpsend}>sign in</Button>


    </div>
  );
}
