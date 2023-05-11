import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import Searchbar from "./Searchbar";
import React from "react";

describe('Searchbar', () => {
  const originalLocation = window.location;
  const originalSessionStorage = window.sessionStorage;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
      writable: true
    });

    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: { removeItem: jest.fn() },
      writable: true
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
      writable: true,
    });

    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: originalSessionStorage,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.restoreAllMocks();
  });

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

  test('clicking logout button removes token from localStorage', () => {
    renderWithProviders(<Searchbar />);
    const button = screen.getByTestId('logout-button');
    button.click();
    expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('token');
  });

  test('clicking logout button reloads page', () => {
    renderWithProviders(<Searchbar />);
    const button = screen.getByTestId('logout-button');
    button.click();
    expect(window.location.reload).toHaveBeenCalled();
  });
});