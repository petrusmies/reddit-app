import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import Comment from "./Comment";

describe('Comment', () => {

  const component = <Comment author="Dummy author" body="Dummy body" downs={2} ups={1} />;

  test('renders Comment component', async () => {
    renderWithProviders(component);
    const comment = await screen.findByTestId('comment');
    expect(comment).toBeInTheDocument();
  });

  test('renders Comment component with correct author', async () => {
    renderWithProviders(component);
    const comment = await screen.findByTestId('comment');
    expect(comment).toHaveTextContent('Dummy author');
  });

  test('renders Comment component with correct body', async () => {
    renderWithProviders(component);
    const comment = await screen.findByTestId('comment');
    expect(comment).toHaveTextContent('Dummy body');
  });

  test('renders Comment component with correct upvotes', async () => {
    renderWithProviders(component);
    const comment = await screen.findByTestId('comment');
    expect(comment).toHaveTextContent('1');
  });

  test('renders Comment component with replies', async () => {  
    // Mocking the replies data
    const replies = {
      data: {
        children: [
          {
            data: {
              author: "Dummy author 1",
              body: "Dummy body 1",
              ups: 1
            }
          },
          {
            data: {
              author: "Dummy author 2",
              body: "Dummy body 2",
              ups: 2
            }
          }
        ]
      }
    };

    renderWithProviders(<Comment author="Dummy author" body="Dummy body" downs={2} ups={1} replies={replies} />);
    const comment = await screen.findAllByTestId('comment');
    expect(comment).toHaveLength(3);
  });

});