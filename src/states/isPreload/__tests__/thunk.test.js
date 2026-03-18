import {
  describe, beforeEach, it, vi, expect,
} from 'vitest';
import * as api from '../../../utils/api';
import { asyncPreloadProcess } from '../slice';
import { setAuthUser } from '../../authUser/slice';

vi.mock('../../../utils/api');

const fakeUserResponse = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image.url/jpg',
};

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when user data fetching success', async () => {
    // arrange
    api.getOwnProfile.mockResolvedValue(fakeUserResponse);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch, () => ({}), {});

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith({ type: 'isPreload/setIsPreload', payload: false });
  });

  it('should dispatch action correctly when user data fetching failed', async () => {
    // arrange
    api.getOwnProfile.mockRejectedValue(new Error('Fetching failed'));
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch, () => ({}), {});

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(null));
    expect(dispatch).toHaveBeenCalledWith({ type: 'isPreload/setIsPreload', payload: false });
  });
});
