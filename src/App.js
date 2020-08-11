import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

//high-order functions: functions that return functions to pass information.
function isSearched_f(searchTerm) {
  return function(item) {
    //condition returning true or false
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

//ES5
function isSearched_ES5(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  };
}

//ES6
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

// component declaration
class App extends Component {
  constructor(props) {
    super(props); //mandatory

    this.state = {
      // list: list
      list,
      searchTerm: ""
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  //the objective is to remove the item identified by the id from the list and store an updated list to the local state
  // // 1
  // onDismiss(id) {
  //   //immutable data structures
  //   const updatedList = this.state.list.filter(function isNotId(item) {
  //     return item.objectID !== id;
  //   });
  //   this.setState({ list: updatedList });
  // }

  //2. extract the function and pass it to the filter function:
  // onDismiss(id) {
  //   function isNotId(item) {
  //     return item.objectID !== id;
  //   }
  //   const updatedList = this.state.list.filter(isNotId);
  //   this.setState({ list: updatedList });
  // }

  //3. JavaScript ES6 arrow function
  // onDismiss(id) {
  //   const lsNotId = item => item.objectID !== id;
  //   const updatedList = this.state.list.filter(lsNotId);

  //   this.setState({ list: updatedList });
  // }

  // 4. inline
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);

    this.setState({ list: updatedList });
  }

  render() {
    const helloWorld = "Welcome to the Road to learn React";
    const helloW = {
      text: "Welcome to the Road to learn React"
    };
    helloW.text =
      "When a const variable is an array or object, the values it holds can get updated through indirect";

    // const array = [1, 4, 9, 16]; // pass a function to map
    // const newArray = array.map(function(x) {
    //   return x * 2;
    // });
    // console.log(newArray);

    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <form>
          <input type="text" onChange={this.onSearchChange} />
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {
          const onHandleDismiss = () => this.onDismiss(item.objectID);

          return (
            <div key={item.objectID}>
              {/* Make sure that the key attribute is a stable identifier. */}
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button onClick={onHandleDismiss} type="button">
                  Dismiss
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

// component usage (also called instantiation for a class)
// creates an instance of the component
export default App;
