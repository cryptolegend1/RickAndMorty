import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import CharacterItem from "./CharacterItem";
import { makeStyles } from "@material-ui/core/styles";
import "../style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0px",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const CharList = (props) => {
  const characterList = useSelector((state) => state.CharacterList);
  const classes = useStyles();
  useEffect(() => {}, [characterList]);

  const showData = () => {
    if (characterList.isLoading) {
      return <p>Loading...</p>;
    }
  };

  return (
    <div className="character-list">
      {showData()}
      <Grid container className={classes.root} justify="center" spacing={6}>
        {characterList.data.map((character) => (
          <Grid item key={character.id}>
            <CharacterItem
              name={character.name}
              image={character.image}
              species={character.species}
              status={character.status}
              id={character.id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CharList;
