import rootReducer from "./fetchCharsReducer";
import charExistsReducer from "./charExistsReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  CharacterList: rootReducer,
  ExistingChar: charExistsReducer,
});

export default allReducers;
