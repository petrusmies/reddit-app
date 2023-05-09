import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Comments from "./Comments";

describe('Comments', () => {

  let setShowComments = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders Comments component', async () => {
    renderWithProviders(<Comments showComments={true} setShowComments={setShowComments} id='1' />);
    const comments = await screen.findByTestId('comments');
    expect(comments).toBeInTheDocument();
  }); 
});