import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../../../context/UserContext";
import { SocketContext } from "../../../../context/SocketContext";
import { Form, TxtBox } from "../../../UIKit";
import "./Register.css";

const Register = () => {
  //#region Instances
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const history = useHistory();
  //#endregion
  
  const handelSubmit = async (event) => {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "appliction/json",
      },
    };

    try {
      //Try to register. if succesed login with the same new user
      const newUser = { name, userName, password };
      
      await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}auth/register`,
        newUser,
        config
      );
      const loginUser = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}auth/login`,
        {
          userName,
          password,
        },
        config
      );

      setUserData({
        token: loginUser.data.token,
        user: loginUser.data.user,
      });
      localStorage.setItem("auth-Token", loginUser.data.token);

      //Alert to everyone someone new register
      socket.emit("addNewRegisterUser", loginUser.data.user._id);

      history.push("/lobby");
    } catch (err) {
      setError(err.response.data.error);
      setName("");
      setUserName("");
      setPassword("");
      setTimeout(() => {
        setError("");
      }, 7500);
    }
  };

  return (
    <div className="enter-image">
      <section className="black-slant">
        <Form
          handelSubmit={handelSubmit}
          title="Register"
          error={error}
          btn="Register"
          link="/"
          linkTxt="Already have an account?"
        >
          <section className="form-input-items-register">
            <TxtBox
              className="text register-input"
              placeholder="Enter Your Name.."
              value={name}
              setValue={setName}
              clsText="register-form-input-name"
            />

            <TxtBox
              placeholder="Enter Your User Name.."
              value={userName}
              setValue={setUserName}
              clsText="register-form-input-username"
            />

            <TxtBox
              placeholder="Enter Your Password.."
              type="password"
              value={password}
              setValue={setPassword}
              clsText="register-form-input-username"
            />
          </section>
        </Form>
      </section>
    </div>
  );
};

export default Register;
