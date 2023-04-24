import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import SearchModal from "./SearchModal";

describe('SearchModal', () => {
  test('if modalOpen is true, renders SearchModal component', () => {
    const modalOpen = true;
    const setModalOpen = jest.fn();
    renderWithProviders(<SearchModal modalOpen={modalOpen} setModalOpen={setModalOpen} />);
    const searchModal = screen.getByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();
  });

  test('should render search input', () => {
    const modalOpen = true;
    const setModalOpen = jest.fn();
    renderWithProviders(<SearchModal modalOpen={modalOpen} setModalOpen={setModalOpen} />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});