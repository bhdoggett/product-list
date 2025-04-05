import { combineReducers } from "redux";
import productsReducer from "./slices/products";

const rootReducer = combineReducers({
  weather: productsReducer,
});

export default rootReducer;
