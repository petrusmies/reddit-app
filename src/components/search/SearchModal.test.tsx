import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import SearchModal from "./SearchModal";

const MockPosts = {
  posts: {
    children: [
      {
        data: {
          id: 1,
          title: "Post 1",
          selftext: "Post 1 body",
          author: "author1",
        },
      },
      {
        data: {
          id: 2,
          title: "Post 2",
          selftext: "Post 2 body",
          author: "author2",
        },
      },
    ],
  },
  loading: false,
};

const component = <SearchModal
  modalOpen={true}
  setModalOpen={jest.fn()}
/>

describe('SearchModal', () => {
  test('if modalOpen is true, renders SearchModal component', () => {
    const modalOpen = true;
    const setModalOpen = jest.fn();
    renderWithProviders(component);
    const searchModal = screen.getByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();
  });

  test('should render search input', () => {
    const modalOpen = true;
    const setModalOpen = jest.fn();
    renderWithProviders(component);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('if modalOpen is true should focus on search input', () => {
    const modalOpen = true;
    const setModalOpen = jest.fn();
    renderWithProviders(component);
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveFocus();
  });
});