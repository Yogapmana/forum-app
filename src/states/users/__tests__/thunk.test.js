import {
  describe, beforeEach, it, vi, expect,
} from 'vitest';
import * as api from '../../../utils/api';
import { asyncGetUsers } from '../slice';

vi.mock('../../../utils/api');

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image.url/jpg',
  },
];

describe('asyncGetUsers thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllUsers.mockResolvedValue(fakeUsersResponse);
    const dispatch = vi.fn();

    // action
    const action = await asyncGetUsers()(dispatch, () => ({}), {});

    // assert
    expect(action.payload).toEqual(fakeUsersResponse);
    expect(api.getAllUsers).toHaveBeenCalled();
  });

  it('should not dispatch action and throw error when data fetching failed', async () => {
    // arrange
    api.getAllUsers.mockRejectedValue(new Error('Fetching failed'));
    const dispatch = vi.fn();

    // action
    const action = await asyncGetUsers()(dispatch, () => ({}), {});

    // assert
    expect(action.error.message).toBe('Fetching failed');
  });
});
