import { describe, it, expect } from "vitest";
import authUserReducer, { setAuthUser } from "../slice";

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = null;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual("Error");
  });

  it("should return the authUser when given by setAuthUser action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: setAuthUser.type,
      payload: {
        id: "user-123",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image.url/jpg",
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });
});
