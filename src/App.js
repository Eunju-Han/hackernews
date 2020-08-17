import React, { Component } from "react";
import "./App.css";
import { func } from "prop-types";

//default parameters to break the URL endpoint
const DEFAULT_QUERY = "redux";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

//ES6
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = { width: "40%" };
const midColumn = { width: "30%" };
const smallColumn = { width: "10%" };

// component declaration
class App extends Component {
  constructor(props) {
    super(props); //mandatory

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
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
    const { result, searchTerm } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <h2>{helloWorld}</h2>
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

// component usage (also called instantiation for a class)
// creates an instance of the component
export default App;

const Search = ({ value, onChange, children }) => {
  // do something
  return (
    <form>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    <div className="table-row">
      <span style={largeColumn}>Title</span>
      <span style={midColumn}>Author</span>
      <span style={smallColumn}>Comments</span>
      <span style={smallColumn}>Points</span>
    </div>
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        {/* Make sure that the key attribute is a stable identifier. */}
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);
