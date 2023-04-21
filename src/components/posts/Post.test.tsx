import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import Post from './Post';

describe('Post', () => {
  test('renders Post component', async () => {
    renderWithProviders(<Post id={'1'} title="Post 1" body="Post 1 body" />);
    const post = await screen.findByTestId('post');
    expect(post).toBeInTheDocument();
  });

  test('renders Post component with correct title', async () => {
    renderWithProviders(<Post id={'1'} title="Post 1" body="Post 1 body" />);
    const post = await screen.findByTestId('post');
    expect(post).toHaveTextContent('Post 1');
  });

  test('renders Post component with correct body', async () => {
    renderWithProviders(<Post id={'1'} title="Post 1" body="Post 1 body" />);
    const post = await screen.findByTestId('post');
    expect(post).toHaveTextContent('Post 1 body');
  });

  test('renders Post component with show comments button', async () => {
    renderWithProviders(<Post id={'1'} title="Post 1" body="Post 1 body" />);
    const button = await screen.findByTestId('show-comments-button');
    expect(button).toBeInTheDocument();
  });

  test('clicking show comments button sets showComments state to true', async () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    const useStateMock: any = (init: any) => [init, setState];
    useStateSpy.mockImplementation(useStateMock);

    renderWithProviders(<Post id={'1'} title="Post 1" body="Post 1 body" />);
    const button = await screen.findByTestId('show-comments-button');
    button.click();
    expect(setState).toHaveBeenCalledWith(true);
  });
});