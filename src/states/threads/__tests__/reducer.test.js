import { describe, it, expect } from 'vitest';
import threadsReducer from '../slice';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by setThreads action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'threads/setThreads',
      payload: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });

  it('should toggle vote up when given by toggleVoteThread action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'threads/toggleVoteThread',
      payload: {
        threadId: 'thread-1',
        voteType: 'up-vote',
        userId: 'user-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toContain('user-2');
  });
});
