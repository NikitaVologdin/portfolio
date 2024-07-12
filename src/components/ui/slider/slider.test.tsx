import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Slider from "./slider";
import stackSlides from "../../../data/technologies";

test("Testing stack slider", async () => {
  const user = userEvent.setup();
  const slider = render(
    <Slider
      firstElementIndex={0}
      slides={stackSlides}
      direction={"right"}
      timeOut={2000}
    />
  );
  const slideToLeftButton = screen.getByTestId("slideToLeft");
  //   const currentSlide = screen.
  await user.click(slideToLeftButton);
  //   expect().toBe()
});
