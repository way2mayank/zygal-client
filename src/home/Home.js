import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState("");
  const [messageString, setMessageString] = useState("");
  const [searchedMessage, setSeachedMessage] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const storeMessage = async () => {
    try {
      const res = await axios.post("http://localhost:4000/search-message", {
        messageString,
      });

      setSeachedMessage(res.data.results);
      console.log("done");
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchMessage = async () => {
    try {
      await axios.post("http://localhost:4000/store-message", {
        message,
      });
      console.log("done");
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearCookies = async () => {
    Cookies.remove("userMessage");
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <label>Submit text message</label>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={storeMessage}>Submit</button>

      <label>search text message</label>
      <textarea
        rows="4"
        cols="50"
        type="text"
        onChange={(e) => setMessageString(e.target.value)}
      />
      <button onClick={searchMessage}>search</button>

      <label>show selected message</label>
      <div>
        <p
          style={{ width: "500px", height: "300px", border: "1px solid blue" }}
        >
          {searchedMessage}
        </p>
      </div>

      <button onClick={clearCookies}>clear all</button>
      <button onClick={logout}>logout all</button>
    </div>
  );
};

export default Home;
