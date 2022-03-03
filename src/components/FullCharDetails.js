import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter } from "../actions/index";
import Header from "../components/Header";
import { AppBar, Button, Tabs, Tab, Box, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EpisodeData from "./EpisodeData";
import "../style.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

const FullCharDetails = (props) => {
  const [createdDate, setCreatedDate] = useState();
  const [originName, setOriginName] = useState();
  const [newArr, setNewArr] = useState();
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const charID = props.match.params.id;
  const dispatch = useDispatch();
  let history = useHistory();
  const charState = useSelector((state) => state.ExistingChar);

  useEffect(() => {
    dispatch(getCharacter(charID));
    setCreatedDate(
      new Date(charState.data.created).toLocaleDateString("en-gb")
    );
    pullEpisodeData();
  }, []);

  useEffect(() => {}, [newArr]);

  const pullEpisodeData = async () => {
    setNewArr(charState.data.episode);
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const showData = () => {
    if (charState.data[charID] !== "") {
      return (
        <div style={{ alignItems: "center" }}>
          <Button
            onClick={(e) => handleReturnButton(e)}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIosIcon />}
            style={{
              height: "auto",
              float: "left",
              marginTop: "50px",
              marginLeft: "25px",
            }}
          >
            Go Back
          </Button>
          <div className="character-details-card">
            <div className="character-details-container">
              <img
                src={charState.data.image}
                alt="Character Image"
                className="character-image"
              />
              <div className="character-details">
                <h3>ID: {charState.data.id}</h3>
                <h3>Name: {charState.data.name}</h3>
                <h3>Status: {charState.data.status}</h3>
                <h3>Species: {charState.data.species}</h3>
                <h3>Type: {charState.data.type || "Unknown"}</h3>
                <h3>Gender: {charState.data.gender}</h3>
                <h3>Origin: {originName}</h3>
                <h3>Created: {createdDate}</h3>
              </div>
            </div>
          </div>
          <AppBar position="static" className={classes.appBar}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Episode One" {...a11yProps(0)} />
              <Tab label="Episode Two" {...a11yProps(1)} />
              <Tab label="Episode Three" {...a11yProps(2)} />
              <Tab label="Episode Four" {...a11yProps(3)} />
              <Tab label="Episode Five" {...a11yProps(4)} />
            </Tabs>
            {newArr
              ? newArr.map((item, index) => (
                  <TabPanel key={index} value={tabValue} index={index}>
                    <EpisodeData charID={charID} episode={item} data={item} />
                  </TabPanel>
                ))
              : "NO DATA"}
          </AppBar>
        </div>
      );
    }
    if (charState.data[charID].isLoading) {
      return <p>Loading...</p>;
    }
  };

  const handleReturnButton = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <AppBar>
        <Header />
      </AppBar>
      <div className="character-details-page">{showData()}</div>
    </div>
  );
};

export default FullCharDetails;
