import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, { Search, Button, Table } from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Button onClick={() => {}}>
        <p>Give Me More</p>
      </Button>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Button onClick={() => {}}>
        <p>Give Me More</p>
      </Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      {
        title: "1",
        author: "1",
        url: "",
        num_comments: 1,
        points: 2,
        objectID: "y"
      },
      {
        title: "2",
        author: "2",
        url: "",
        num_comments: 1,
        points: 2,
        objectID: "z"
      }
    ],
    onDismiss: () => {}
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows two items in list and column titles", () => {
    const element = shallow(<Table {...props} />);

    expect(element.find(".table-row").length).toBe(3); //including columns titles
  });
});

// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
