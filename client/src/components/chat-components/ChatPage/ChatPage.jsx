import React, { useContext} from "react";
import HasErrorContext from "../../../context/HasErrorContext";
import UserContext from "../../../context/UserContext";
import ErrorPage from "../../app-components/Errors/ErrorPage/ErrorPage";
import { NavBar } from "../../UIKit";
import Chat from '../Chat/Chat'
import "./ChatPage.css";

const ChatPage = () => {


  const { hasError } = useContext(HasErrorContext);
  const { setUserData } = useContext(UserContext);

  return (
    <>
      <section>
        <NavBar isLobby={false} setUserData={setUserData}/>
      </section>
      {hasError ? (
        <ErrorPage error={hasError} />
      ) : (
          <div className="chat-card">
            
            <Chat/>

          </div>
      )}
    </>
  );
};

export default ChatPage;