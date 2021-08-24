import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { SocketContext } from "../../../../context/SocketContext";
import UseContext from "../../../../context/UserContext";
import { Form, TxtBox } from "../../../UIKit";
import "./Login.css";

const Login = () => {
  //#region Instances
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserData } = useContext(UseContext);
  const { socket } = useContext(SocketContext);
  //#endregion

  const history = useHistory();
  const handelSubmit = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "appliction/json",
      },
    };

    try {
      //Try to login the user and if succesed insert his data and token to the user data context
      const loginUser = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}auth/login`,
        { userName, password },
        config
      );

      setUserData({
        token: loginUser.data.token,
        user: loginUser.data.user,
      });
      localStorage.setItem("auth-Token", loginUser.data.token);

      //Add the new login user to the socket users array
      socket.emit("addUserToArray", loginUser.data.user._id);

      history.push("/lobby");
    } catch (err) {
      setError(err.response.data.error);
      setUserName("");
      setPassword("");
      setTimeout(() => {
        setError("");
      }, 7500);
    }
  };

  return (
    <div className="enter-image">
      <section className="white-slant">
        <Form
          handelSubmit={handelSubmit}
          title="Login"
          error={error}
          btn="Login"
          link="/register"
          linkTxt="Don't have an account?"
        >
          <section className="form-input-items-login">
            <TxtBox
              placeholder="Enter User Name.."
              value={userName}
              setValue={setUserName}
              clsText="login-form-input-username"
            />

            <TxtBox
              placeholder="Enter Password.."
              type="password"
              value={password}
              setValue={setPassword}
              clsText="login-form-input-password"
            />
          </section>
        </Form>
      </section>
    </div>
  );
};

export default Login;
