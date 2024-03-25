import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import Question from "./Question";
import { MemoryRouter } from "react-router";
import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import * as router from "react-router";

/* Unit test for _saveQuestion */
describe("_saveQuestion", () => {
  it("will return the question if the question is valid", async () => {
    const question = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: "sarahedo",
    };
    const result = await _saveQuestion(question);
    expect(result.author).toEqual(question.author);
  });

  it("will return an error if the optionOneText is null", async () => {
    const question = {
      optionOneText: null,
      optionTwoText: "Option 1",
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });

  it("will return an error if the optionTwoText is null", async () => {
    const question = {
      optionOneText: "Option 1",
      optionTwoText: null,
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });

  it("will return an error if the author is null", async () => {
    const question = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: null,
    };
    await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});

/* Unit test for  _saveQuestionAnswer*/
describe("_saveQuestionAnswer", () => {
  it("will return true if the payload is valid", async () => {
    const payload = {
      answer: "optionOne",
      qid: "8xf0y6ziyjabvozdd253nd",
      authedUser: "sarahedo",
    };
    const result = await _saveQuestionAnswer(payload);
    expect(result).toEqual(true);
  });

  it("will return an error if the answer is null", async () => {
    const payload = {
      answer: null,
      qid: "8xf0y6ziyjabvozdd253nd",
      authedUser: "sarahedo",
    };
    await expect(_saveQuestionAnswer(payload)).rejects.toEqual("Please provide authedUser, qid, and answer");
  });

  it("will return an error if the qid is null", async () => {
    const payload = {
      answer: "optionOne",
      qid: null,
      authedUser: "sarahedo",
    };
    await expect(_saveQuestionAnswer(payload)).rejects.toEqual("Please provide authedUser, qid, and answer");
  });

  it("will return an error if the authedUser is null", async () => {
    const payload = {
      answer: "optionOne",
      qid: "8xf0y6ziyjabvozdd253nd",
      authedUser: null,
    };
    await expect(_saveQuestionAnswer(payload)).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});

/* Snapshot test for Question component */
describe("Question", () => {
  it("matches the snapshot when a question is passed", () => {
    const question = {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["sarahedo"],
          text: "Build our new application with Javascript",
        },
        optionTwo: {
          votes: [],
          text: "Build our new application with Typescript",
        },
      },
    };
    const component = render(
      <MemoryRouter>
        <Question question={question} />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("matches the snapshot when no question is passed", () => {
    const component = render(
      <MemoryRouter>
        <Question />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});

/* Event Dom test for  Question component*/
describe("Dom Question Event", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  it("Will be call function", () => {
    const question = {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["sarahedo"],
          text: "Build our new application with Javascript",
        },
        optionTwo: {
          votes: [],
          text: "Build our new application with Typescript",
        },
      },
    };
    const component = render(
      <MemoryRouter>
        <Question question={question} />
      </MemoryRouter>
    );

    const submitButton = component.getByTestId("btn-add-question");
    fireEvent.click(submitButton);
    expect(navigate).toHaveBeenCalled();
  });
});
