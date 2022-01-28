import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
// components
import ListImage from "./ListImage";
// mui
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// list images
import avatarOne from "../../images/avatarOne.JPG"
import avatarTwo from "../../images/avatarTwo.jpg";
import avatarThree from "../../images/avatarThree.jpg";

// css
import "../../css/ListProfile.css";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginTop: "2%",
  },
}));

const ListProfile = ({
  name,
  height = "176px",
  minWidth = "220px",
  imageURL,
  creator,
  likes
}) => {
  const history = useHistory();
  const classes = useStyles();
  const sendToList = () => {
    history.push(`/lists/${name}`, { from: "homepage" });
  };

  return (
    <div
      onClick={sendToList}
      style={{
        height: height,
        minWidth: minWidth,
        width: "100%",
        // display: "flex",
        // flexDirection: "column",
        display: "grid",
        gridTemplateRows: "50% 50%",
        margin: "4%",
        backgroundColor: "#EBEDEF",
      }}
    >
      <div className="lpUpperContainer">
        <ListImage name={name} imageURL={imageURL} />
      </div>
      <div className="lpLowerContainer">
        <div className="lpLikedBy">
          <AvatarGroup className="lpAvatarGroup">
            <Avatar alt="T" className={classes.small} src={avatarOne} />
            <Avatar alt="L" className={classes.small} src={avatarTwo} />
            <Avatar alt="A" className={classes.small} src={avatarThree} />
          </AvatarGroup>
          <p className="lpLikeCount">liked by <span className="lpSpacer">{likes} people</span></p>
        </div>
        <div className="lpCreatedBy">
          <p>Created by <span className="lpSpacer">{creator}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ListProfile;
