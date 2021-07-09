import './App.css';
import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from "redux";

const reducer = state => state;

const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const monitorReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = Math.round(end - start);
    console.log(diff);

    return newState;
  }

  return createStore(monitorReducer, initialState, enhancer);
};

const store = createStore(reducer, monitorEnhancer);

store.dispatch({type: "Hello"})

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
