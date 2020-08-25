import React, { Component } from "react";
import "./App.css";
import { func } from "prop-types";

//default parameters to break the URL endpoint
const DEFAULT_QUERY = "redux";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

// //ES6
// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

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
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
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
    // const updatedList = this.state.list.filter(item => item.objectID !== id);

    // this.setState({ list: updatedList });

    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      // Object.assign(target object, source object, source ojbect)
      // source objects are merge into the target obj
      // result: Object.assign({}, this.state.result, { hits: updatedHits })

      //spread operator
      result: { ...this.state.result, hits: updatedHits }
    });
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
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {/* Conditional Rendering */}
        {/* ternary operator */}
        {/* {result ? (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        ) : null} */}
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
      </div>
    );
  }
}

// component usage (also called instantiation for a class)
// creates an instance of the component
export default App;

const Search = ({ value, onChange, onSubmit, children }) => {
  // do something
  return (
    <form onSubmit={onSubmit}>
      {children}
      <input type="text" value={value} onChange={onChange} />
      <button type="submit"> {children}</button>
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

    {/* {list.filter(isSearched(pattern)).map(item => ( */}
    {list.map(item => (
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
