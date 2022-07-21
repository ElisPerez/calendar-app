import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = '';

describe('Test in the auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('start login with correct user', async () => {
    await store.dispatch(startLogin('elisperezmusic@test.com', '123456'));

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));


    // console.log(localStorage.setItem.mock.calls[0][1]);
    token = localStorage.setItem.mock.calls[0][1];
  });

  test('start login with incorrect user', async () => {
    await store.dispatch(startLogin('elisperezmusic@test.com', 'incorrectPassword'));

    let actions = store.getActions();
    // console.log(actions);
    expect(actions).toEqual([]);

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'User or password is incorrect! Password: Elis Delete this message', 'error');

    await store.dispatch(startLogin('incorrect-email@test.com', '123456'));

    actions = store.getActions();
    // console.log('action of incorrect email:', actions);
    expect(actions).toEqual([]);

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'User or password is incorrect! Email: Elis Delete this message', 'error');
  });
});
