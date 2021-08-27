import React, { useContext} from "react";
import UserContext from "../../../../context/UserContext";
import CurrentChatContext from "../../../../context/CurrentChatContext";
import { nameLength } from '../../../../Logic/Common'
import { Line } from "../../../UIKit";
import "./Header.css";

const Header = () => {
  const { currentChat} = useContext(CurrentChatContext);
  const { userData } = useContext(UserContext);

  const otherUser = currentChat?.members.filter(
    (u) => u.name !== userData.user.name
  );

  return (
    <>
      <div className="header-continer">
        <Line justify="center">
          {currentChat ? (
            <>
              <div className="header-title" lenght={nameLength(otherUser[0])}>
                Chat with {otherUser[0].name}
              </div>
            </>
          ) : null}
        </Line>
      </div>
    </>
  );
};

export default Header;
