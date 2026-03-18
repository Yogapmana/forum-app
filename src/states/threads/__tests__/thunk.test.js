import {
  describe, beforeEach, it, vi, expect,
} from 'vitest';
import * as api from '../../../utils/api';
import { asyncGetThreads } from '../slice';

vi.mock('../../../utils/api');

const fakeThreadsResponse = [
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

describe('asyncGetThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllThreads.mockResolvedValue(fakeThreadsResponse);
    const dispatch = vi.fn();

    // action
    const action = await asyncGetThreads()(dispatch, () => ({}), {});

    // assert
    expect(action.payload).toEqual(fakeThreadsResponse);
    expect(api.getAllThreads).toHaveBeenCalled();
  });

  it('should not dispatch action and throw error when data fetching failed', async () => {
    // arrange
    api.getAllThreads.mockRejectedValue(new Error('Fetching failed'));
    const dispatch = vi.fn();

    // action
    const action = await asyncGetThreads()(dispatch, () => ({}), {});

    // assert
    expect(action.error.message).toBe('Fetching failed');
  });
});
