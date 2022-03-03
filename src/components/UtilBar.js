import React, { useState, useEffect } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Button,
  Toolbar,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Menu as MenuIcon } from "@material-ui/icons";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import CharList from "../components/CharList";
import { useDispatch, useSelector } from "react-redux";
import { filterCharacters } from "../actions/index";
import { pullCharacterData } from "../actions/index";
import "../style.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    alignItems: "center",
    display: "block",
    zIndex: "1401",
  },
  drawerPaper: {
    boxSizing: "border-box",
    height: "100vh - 150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "300px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "300px",
    justifyContent: "space-evenly",
  },
}));

const UtilBar = (props) => {
  const [page, setPage] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [charStatus, setCharStatus] = useState("");
  const [charGender, setCharGender] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const characterList = useSelector((state) => state.CharacterList);
  const { window } = props;
  const classes = useStyles();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = (page) => {
    dispatch(pullCharacterData(page));
  };

  //ALLOWS DRAWER TO OPEN ON MOBILE
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //UPDATING SEARCH TERM
  const handleQueryChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  //UPDATING SEARCH STATUS
  const updateCharStatus = (e) => {
    e.preventDefault();
    setCharStatus(e.target.value);
  };

  //UPDATING SEARCH GENDER
  const updateCharGender = (e) => {
    e.preventDefault();
    setCharGender(e.target.value);
  };

  //SUBMIT SEARCH FORM
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    dispatch(filterCharacters(query, charStatus, charGender));
  };

  const handlePageChange = (e, value) => {
    dispatch(filterCharacters(query, charStatus, charGender, value));
    console.log(value);
  };

  //DRAWER FOR QUERY
  const drawer = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Divider />
      <form className={classes.form} onSubmit={(e) => handleQuerySubmit(e)}>
        <label
          htmlFor="outlined-basic"
          style={{ fontSize: "12px", marginBottom: "-15px" }}
        >
          Name
        </label>
        <TextField
          onChange={(e) => {
            handleQueryChange(e);
          }}
          id="outlined-basic"
        />
        <label
          style={{ fontSize: "12px", marginBottom: "-15px" }}
          htmlFor="status"
        >
          Status
        </label>
        <Select
          id="status"
          type="submit"
          value={charStatus ? charStatus : ""}
          onChange={(e) => updateCharStatus(e)}
        >
          <MenuItem value="unknown">Unknown</MenuItem>
          <MenuItem value="dead">Dead</MenuItem>
          <MenuItem value="alive">Alive</MenuItem>
        </Select>
        <label
          style={{ fontSize: "12px", marginBottom: "-15px" }}
          htmlFor="gender"
        >
          Gender
        </label>
        <Select
          id="gender"
          value={charGender ? charGender : ""}
          onChange={(e) => updateCharGender(e)}
          labelId="gender-select"
        >
          <MenuItem value="unknown">Unknown</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}
        >
          Search
        </Button>
      </form>
      <Divider />
    </div>
  );

  return (
    <div>
      <div>
        <AppBar elevation={0} className={classes.appBar}>
          <Toolbar>
            <Hidden lgUp implementation="css">
              <IconButton
                className="menu-icon"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Header />
          </Toolbar>
        </AppBar>
      </div>
      <nav>
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            classes={{ paper: classes.drawerPaper }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <div>{drawer}</div>
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <CharList id="top" />
      <div className="page-bottom-utilities">
        <Pagination
          className="pagination-bar"
          color="primary"
          count={characterList.page || 34}
          page={page}
          onChange={handlePageChange}
        />
        <IconButton className="to-top-btn" color="primary" href="#top">
          <ExpandLessIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default UtilBar;
