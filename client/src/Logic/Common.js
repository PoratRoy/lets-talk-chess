
export const getMembers = (members, user) => {

    let currentPlayer = members[0]._id === user._id ? members[0] : members[1];
    let otherPlayer = members[0]._id === user._id ? members[1] : members[0];

    return {
        currentPlayer : currentPlayer,
        otherPlayer : otherPlayer
    }
}

export const nameLength = (player) => {
    //Size of the title by the length of the name
    const len = player.name.length;
    let length = "";
    if (len <= 5) {
        length = "s";
    } else if (len > 5 && len < 20) {
        length = "m";
    } else {
        length = "l";
    }

    return length
}
