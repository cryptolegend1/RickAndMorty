import axios from "axios";

export const pullCharacterData = (page) => async (dispatch) => {
  try {
    dispatch({
      type: "LIST_LOADING",
    });
    if (page === 1) {
      const res = await axios.get(`https://rickandmortyapi.com/api/character`);
      dispatch({
        type: "UPDATE_PAGE",
        payload: ({ page: res.data.info.pages }, { data: res.data.results }),
      });
    } else {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      dispatch({
        type: "LIST_LOAD_SUCCESS",
        payload: res.data,
      });
      dispatch({
        type: "UPDATE_PAGE",
        payload: ({ page: res.data.info.pages }, { data: res.data.results }),
      });
    }
  } catch (e) {
    dispatch({
      type: "LIST_LOAD_FAIL",
    });
  }
};

export const filterCharacters =
  (query, charStatus, charGender, value) => async (dispatch) => {
    try {
      dispatch({
        type: "LIST_LOADING",
      });
      //QUERY BY ALL FILTERS
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${query}&status=${charStatus}&gender=${charGender}&page=${value}`
      );
      dispatch({
        type: "LIST_LOADING_SUCCESS",
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: "LIST_LOAD_FAIL",
      });
    }
  };

export const characterQuery = (query) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${query}`
    );
    dispatch({
      type: "LIST_LOADING_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "LIST_LOAD_FAIL",
    });
  }
};

export const getCharacter = (charID) => async (dispatch) => {
  try {
    dispatch({
      type: "LIST_LOADING",
    });
    const res = await axios.get(
      `https://rickandmortyapi.com/api/character/${charID}`
    );
    dispatch({
      type: "CHARACTER_EXISTS_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "LIST_LOADING_FAIL",
    });
  }
};
