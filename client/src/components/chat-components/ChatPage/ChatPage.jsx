import React, { useState, useContext} from "react";
import HasErrorContext from "../../../context/HasErrorContext";
import UserContext from "../../../context/UserContext";
import ErrorPage from "../../app-components/Errors/ErrorPage/ErrorPage";
import { NavBar } from "../../UIKit";
import Chat from '../Chat/Chat'
import "./ChatPage.css";

const ChatPage = () => {

  const [hasError, setHasError] = useState(null);
  const { setUserData } = useContext(UserContext);

  return (
    <>
      <section>
        <NavBar isLobby={false} setUserData={setUserData}/>
      </section>
      {hasError ? (
        <ErrorPage error={hasError} />
      ) : (
        <HasErrorContext.Provider value={{ setHasError }}>
          <div className="chat-card">
            
            <Chat/>

          </div>
        </HasErrorContext.Provider>
      )}
    </>
  );
};

export default ChatPage;