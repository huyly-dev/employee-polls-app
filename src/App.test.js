import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import middleware from "./middleware";
import { MemoryRouter } from "react-router";
import { test } from "@jest/globals";

const appStore = createStore(reducers, middleware);

test("", () => {
  render(
    <Provider store={appStore}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  screen.debug();
});
