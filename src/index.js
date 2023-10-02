import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import axios from "axios";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

// reducers
const gifList = (state = [], action) => {
  switch (action.type) {
    case "SET_GIF_LIST":
      return action.payload;
  }
  return state;
};

// sagas
function* fetchGifs(action) {
  try {
    const search = action.payload;
    const gifsResponse = yield axios.get("/gifs", {
      params: { search },
    });
    yield put({ type: "SET_GIF_LIST", payload: gifsResponse.data });
    console.log("search response", gifsResponse.data);
  } catch (error) {
    console.log("error fetching gifs", error);
  }
}

function* rootSaga() {
  yield takeEvery("FETCH_GIFS", fetchGifs);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ gifList }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
