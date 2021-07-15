import './App.css';
import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from "redux";

// import logger from 'redux-logger'; `prev state`/`action`/`next state`
// import thunk from 'redux-thunk';

const HELLO = "HELLO";

const reducer = (state = { hello: "hi" }, action) => {
  switch (action.type) {
    case HELLO:
      return {...state, bye: "adios"};
      break;
    default:
      return state;
  }
};

const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const monitorReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action);
    const end = performance.now()
    const diff = end - start;
    console.log(diff)

    return newState;
  }

  return createStore(monitorReducer, initialState, enhancer);
}

const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const logReducer = (state, action) => {
    console.log("OLD state (enhancer)", state);
    console.log("action", action.type);
    const newState = reducer(state, action);
    console.log("NEW state (enhancer)", newState);

    return newState;
  }

  return createStore(logReducer, initialState, enhancer);
};

// const store = createStore(reducer, monitorEnhancer);
// const store = createStore(reducer, logEnhancer);
// or
const composedEnhancer = compose(monitorEnhancer, logEnhancer);

const logMiddleware = store => next => action => {
  console.log("OLD state (middlewhare)", store.getState());
  next(action);
  console.log("NEW state (middlewhare)", store.getState());
}

const monitorMiddleware = store => next => action => {
  const start = performance.now()
  next(action);
  const end = performance.now()
  const diff = end - start;
  console.log("performance ", diff)
}

const store = createStore(reducer, applyMiddleware(logMiddleware, monitorMiddleware));

store.dispatch({ type: HELLO })

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Foo
        </p>
      </header>
    </div>
  );
}

export default App;
