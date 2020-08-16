import React, { Component } from "react";
import "./App.css";
import { func } from "prop-types";

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

    const { list, searchTerm } = this.state;
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <Search value={searchTerm} onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

// component usage (also called instantiation for a class)
// creates an instance of the component
export default App;

// // Refactoring ES6 Class Compnents -> Functional Stateless Components
// // as you don’t need local state or component lifecycle methods
// // Step 1
// // The props are accessible in the function signature,
// // and the return value is JSX
// function Search(props) {
//   const { value, onChange, children } = props;
//   return (
//     <form>
//       {children}
//       <input type="text" value={value} onChange={onChange} />
//     </form>
//   );
// }

// // Refactoring ES6 Class Compnents -> Functional Stateless Components
// // Step 2
// // The best practice is to use it in the function signature
// // to destructure the props
// function Search({ value, onChange, children }) {
//   return (
//     <form>
//       {children}
//       <input type="text" value={value} onChange={onChange} />
//     </form>
//   );
// }

// // Refactoring ES6 Class Compnents -> Functional Stateless Components
// // Step 3
// // ES6 arrow functions that makes fuctions concise and also removes the block body of the function.
// // In a concise body, an implicit return is attached, removes the return statement.
// const Search = ({ value, onChange, children }) => (
//   <form>
//     {children}
//     <input type="text" value={value} onChange={onChange} />
//   </form>
// );

// Refactoring ES6 Class Compnents -> Functional Stateless Components
// Step 4
// props as input and JSX as output, and you could do something in between
const Search = ({ value, onChange, children }) => {
  // do something
  return (
    <form>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div>
//         {list.filter(isSearched(pattern)).map(item => {
//           return (
//             <div key={item.objectID}>
//               {/* Make sure that the key attribute is a stable identifier. */}
//               <span>
//                 <a href={item.url}>{item.title}</a>
//               </span>
//               <span>{item.author}</span>
//               <span>{item.num_comments}</span>
//               <span>{item.points}</span>
//               <span>
//                 <Button onClick={() => onDismiss(item.objectID)}>
//                   Dismiss
//                 </Button>
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

// // Step1
// function Table(props) {
//   const { list, pattern, onDismiss } = props;
//   return (
//     <div>
//       {list.filter(isSearched(pattern)).map(item => {
//         return (
//           <div key={item.objectID}>
//             {/* Make sure that the key attribute is a stable identifier. */}
//             <span>
//               <a href={item.url}>{item.title}</a>
//             </span>
//             <span>{item.author}</span>
//             <span>{item.num_comments}</span>
//             <span>{item.points}</span>
//             <span>
//               <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// Step2 and Step3 ES6 arrow functions
const Table = ({ list, pattern, onDismiss }) => (
  <div>
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID}>
        {/* Make sure that the key attribute is a stable identifier. */}
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
          <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
        </span>
      </div>
    ))}
  </div>
);

// // Step4 - some login between input and output
// const Table = ({ list, pattern, onDismiss }) => {
//   //do someting
//   return (
//     <div>
//       {list.filter(isSearched(pattern)).map(item => {
//         return (
//           <div key={item.objectID}>
//             {/* Make sure that the key attribute is a stable identifier. */}
//             <span>
//               <a href={item.url}>{item.title}</a>
//             </span>
//             <span>{item.author}</span>
//             <span>{item.num_comments}</span>
//             <span>{item.points}</span>
//             <span>
//               <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// class Button extends Component {
//   render() {
//     // The className will be a default value of empty string instead of undefined.
//     const { onClick, className = "", children } = this.props;

//     return (
//       <button onClick={onClick} className={className} type="button">
//         {children}
//       </button>
//     );
//   }
// }

// Refactoring ES6 class component -> functional stateless component
const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);
