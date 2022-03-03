import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actions: {
    "&:hover": {
      backgroundColor: "transparent !important",
      cursor: "default",
    },
  },
  button: {
    color: "white",
    margin: "10px",
    fontSize: "14px",
  },
}));

const CharacterItem = (props) => {
  const classes = useStyles();

  return (
    <Card className="character-card">
      <CardActionArea className={classes.actions}>
        <CardMedia className="card-image-container">
          <img className="card-image" src={props.image} alt="" />
        </CardMedia>
        <CardContent>
          <p>{props.name}</p>
          <p>{props.species}</p>
          <p>{props.status}</p>
        </CardContent>
        <div
          style={{ flex: "display", justifyContent: "center", width: "100%" }}
        >
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            <NavLink
              to={`character/${props.id}`}
              style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
            >
              Details
            </NavLink>
          </Button>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default CharacterItem;
