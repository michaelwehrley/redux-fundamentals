import './App.css';
import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from "redux";

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
    console.log("OLD state", state);
    console.log("action", action.type);
    const newState = reducer(state, action);
    console.log("NEW state", newState);

    return newState;
  }

  return createStore(logReducer, initialState, enhancer);
};

// const store = createStore(reducer, monitorEnhancer);
const store = createStore(reducer, logEnhancer);
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
