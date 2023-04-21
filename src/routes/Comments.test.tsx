import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import Comments from "./Comments";

describe('Comments', () => {
  test('renders Comments component', async () => {
    renderWithProviders(<Comments />);
    const comments = await screen.findByTestId('comments');
    expect(comments).toBeInTheDocument();
  });  
});