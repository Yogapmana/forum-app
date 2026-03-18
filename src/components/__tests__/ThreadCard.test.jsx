import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import ThreadCard from '../ThreadCard';

const fakeStore = configureStore({
  reducer: {
    authUser: () => null,
  },
});

describe('ThreadCard component', () => {
  const fakeThread = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  };

  const fakeOwner = {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image.url/jpg',
  };

  it('should render thread title and owner correctly', () => {
    // arrange & action
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ThreadCard thread={fakeThread} owner={fakeOwner} />
        </BrowserRouter>
      </Provider>,
    );

    // assert
    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });
});
