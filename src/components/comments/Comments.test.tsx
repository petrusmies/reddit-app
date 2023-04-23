import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Comments from "./Comments";

describe('Comments', () => {

  let setShowComments = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders Comments component', async () => {
    renderWithProviders(<Comments showComments={true} setShowComments={setShowComments} title="Dummy title" body="Dummy body" />);
    const comments = await screen.findByTestId('comments');
    expect(comments).toBeInTheDocument();
  }); 

  test('renders Comments component with correct title', async () => {
    renderWithProviders(<Comments showComments={true} setShowComments={setShowComments} title="Dummy title" body="Dummy body" />);
    const comments = await screen.findByTestId('comments');
    expect(comments).toHaveTextContent('Dummy title');
  });

  test('renders Comments component with correct body', async () => {
    renderWithProviders(<Comments showComments={true} setShowComments={setShowComments} title="Dummy title" body="Dummy body" />);
    const comments = await screen.findByTestId('comments');
    expect(comments).toHaveTextContent('Dummy body');
  });
});