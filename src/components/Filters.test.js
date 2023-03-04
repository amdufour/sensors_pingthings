import { render, screen } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters component", () => {

  test("Display available tags", () => {
    const mockTags = ["Active", "Power"];
    render(<Filters tags={mockTags} />);

    const firstTagOutput = screen.getByText("Active");
    expect(firstTagOutput).toBeInTheDocument();

    const secondTagOutput = screen.getByText("Power");
    expect(secondTagOutput).toBeInTheDocument();
  });

});