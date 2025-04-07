import { combineReducers } from "redux";
import productsReducer from "./products/products";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
