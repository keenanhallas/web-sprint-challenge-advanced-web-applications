import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value
    });
    console.log(loginForm);
  }

  const login = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", loginForm)
        .then(res => {
            console.log({res});
            localStorage.setItem("token", res.data.payload);
            props.history.push("/bubblepage");
        })
        .catch(err => console.log({err}))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <label htmlFor="username">Username: </label>
        <input
            id="username"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
        />
        <button onClick={login}>Log In</button>
      </form>
    </>
  );
};

export default Login;
