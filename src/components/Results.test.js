import { render, screen } from "@testing-library/react";
import Results from "./Results";

describe("Results component", () => {

  test("If results, display a list of sensors", () => {
    const mockSensor = {
      id: "s1",
      name: "mock_name",
      latitude: 55,
      longitude: 60,
      tags: ["Active", "Power"]
    };
    render(<Results sensors={[mockSensor]} />);

    const cardNameOutput = screen.getByText("mock_name");
    expect(cardNameOutput).toBeInTheDocument();

    const cardLatitudeOutput = screen.getByText("55");
    expect(cardLatitudeOutput).toBeInTheDocument();

    const cardTagsOutput = screen.getByText("Active");
    expect(cardTagsOutput).toBeInTheDocument();
  });

  test("If no result, display the text 'Bummer! No results found.'", () => {
    render(<Results sensors={[]} />);

    const noResultOutput = screen.getByText("Bummer! No results found.");
    expect(noResultOutput).toBeInTheDocument();
  });

});