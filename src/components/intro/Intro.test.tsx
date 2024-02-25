import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Intro from "./Intro";
import userEvent from "@testing-library/user-event";

test("Testing Intro component", () => {
  //Arange
  render(<Intro />);
  const element = screen.getByText("Nikita Vologdins,");
  expect(element).toBeInTheDocument();
});
