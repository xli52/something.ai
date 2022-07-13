import { useState } from "react";
import axios from "axios";

export default function UserLogin(props) {
  const [serverReply, setServerReply] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const register = (e) => {
    e.preventDefault();
    return axios
      .post("/user/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log("I got something back!", res);
        res.data.userID
          ? setServerReply(res.data.userID)
          : setServerReply(res.data);
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in! ${email} and ${password}`);
    return axios
      .post("/user/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("I got something back!", res);
        res.data.userID
          ? setServerReply(res.data.userID)
          : setServerReply(res.data);
      })
      .catch((err) => console.error(err));
  };

  const logout = () => {
    axios
      .post("/user/logout")
      .then((res) => setServerReply(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <button onClick={logout}>Logout</button>

      <form onSubmit={register}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Register!" />
      </form>
      <p>{serverReply}</p>
    </div>
  );
}
