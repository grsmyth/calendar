import logo from "./logo.svg";
import "./App.css";

function App() {
  async function createTodo(data) {
    return fetch("/.netlify/functions/todos-create", {
      body: JSON.stringify(data),
      method: "POST",
    }).then((response) => {
      return response.json();
    });
  }

  // Todo data
  const myTodo = {
    title: "My todo title",
    completed: false,
  };

  // create it!
  const create = () => {
    createTodo(myTodo)
      .then((response) => {
        console.log("API response", response);
        // set app state
      })
      .catch((error) => {
        console.log("API error", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={create}>BUTTON</button>
      </header>
    </div>
  );
}

export default App;
