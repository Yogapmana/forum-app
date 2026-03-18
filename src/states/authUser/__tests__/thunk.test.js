import {
  describe, beforeEach, it, vi, expect,
} from 'vitest';
import * as api from '../../../utils/api';
import { asyncSetAuthUser, setAuthUser } from '../slice';

vi.mock('../../../utils/api');

const fakeAuthUserResponse = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image.url/jpg',
};
const fakeToken = 'fake-token';

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeAuthUserResponse);
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch, () => ({}), {});

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeAuthUserResponse));
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
  });

  it('should not dispatch action and throw error when data fetching failed', async () => {
    // arrange
    api.login.mockRejectedValue(new Error('Login failed'));
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch, () => ({}), {});

    // assert
    expect(dispatch).not.toHaveBeenCalledWith(setAuthUser(fakeAuthUserResponse));
    expect(api.putAccessToken).not.toHaveBeenCalled();
  });
});
