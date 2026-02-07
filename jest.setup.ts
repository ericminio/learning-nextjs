import "@testing-library/jest-dom";

jest.mock("@domain/uuid", () => ({
  uuid: jest.fn(() => "test-uuid"),
}));
