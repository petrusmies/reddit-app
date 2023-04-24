import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import Searchbar from "./Searchbar";
import React from "react";

describe('Searchbar', () => {
  test('renders Searchbar component', () => {
    renderWithProviders(<Searchbar />);
    const searchbar = screen.getByTestId('searchbar');
    expect(searchbar).toBeInTheDocument();
  });

  test('renders button with correct text', () => {
    renderWithProviders(<Searchbar />);
    const button = screen.getByTestId('search-button');
    expect(button).toHaveTextContent('Search...');
  });

  test('clicking search button sets modalOpen state to true', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    const useStateMock: any = (init: any) => [init, setState];
    useStateSpy.mockImplementation(useStateMock);
    renderWithProviders(<Searchbar />);
    const button = screen.getByTestId('search-button');
    button.click();
    expect(setState).toHaveBeenCalledWith(true);
  });
});