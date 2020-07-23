import React, { Component } from "react";

class ExplainBindingsComponent1 extends Component {
  constructor() {
    super();

    // the class method is properly bound in the class constructor:
    this.onClickMe = this.onClickMe.bind(this);
  }

  onClickMe() {
    console.log(this);
  }

  render() {
    return (
      <button onClick={this.onClickMe} type="button">
        Click Me
      </button>
    );
  }

  //   render() {
  //     return (
  //       // *** Avoid this practice
  //       // every time the component updates, which will hurt your application’s performance
  //       <button onClick={this.onClickMe.bind(this)} type="button">
  //         Click Me
  //       </button>
  //     );
  //   }
}

//Avoid this approach as well,
// as it will clutter your constructor over time.
// The constructor is only there to instantiate your class with all its properties,
// so the business logic of class methods should be defined outside the constructor.
class ExplainBindingsComponent2 extends Component {
  constructor() {
    super();

    // *** Avoid this approach
    // it will clutter your constructor over time
    // the BUSINESS LOGIC of class methods should be defined outside the constructor.
    this.onClickMe = () => {
      console.log(this);
    };

    this.doSomething = this.doSomething.bind(this);
    this.doSomethingElse = this.doSomethingElse.bind(this);
  }

  //   onClickMe() {
  //     console.log(this);
  //   }

  doSomething() {
    // do something
  }
  doSomethingElse() {
    // do something else
  }

  render() {
    return (
      <button onClick={this.onClickMe} type="button">
        Click Me
      </button>
    );
  }
}

class ExplainBindingsComponent3 extends Component {
  // Class methods can be auto-bound using JavaScript ES6 arrow functions:
  // Use this method if the repetitive binding in the constructor annoys you.
  onClickMe = () => {
    console.log(this);
  };

  render() {
    return (
      <button onClick={this.onClickMe} type="button">
        Click Me
      </button>
    );
  }
}

class Counter extends Component {
  state = { value: 0 };

  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

export default Counter;
