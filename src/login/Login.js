import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from 'js-cookie'
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  let token = cookie.get("token")
  useEffect(()=>{
     if(token){
    navigate("/")
  }
  },[])
 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/login", {
        email: username,
        password,
      });

      cookie.set("token", res.data.token)
      console.log(res.data);
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" onClick={handleFormSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
