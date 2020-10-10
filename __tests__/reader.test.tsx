import React from "react";
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import mock from "xhr-mock";
import fetchMock from "jest-fetch-mock";
import Reader from "../src/reader";

describe("reader view", () => {
  beforeAll(() => {
    mock.setup();
    fetchMock.disableMocks();
  });
  const url = process.env.URL || "https://www.a11ywatch.com";

  test("reader can render", async () => {
    render(<Reader url={url} />);

    await waitFor(() => screen.getByText("Loading..."));
    await waitFor(() => expect(document.querySelector("iframe")).toBeTruthy());
  });
});
