/* eslint-disable no-console */
import axios from '../../../services/axios';
import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// eslint-disable-next-line default-param-last, func-names
export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      console.log(action);
      return newState;
    }

    case types.LOGIN_REQUEST: {
      console.log('Estou fazendo a requisição');
      const newState = { ...state };
      newState.isLoading = true;

      return newState;
    }

    case types.LOGIN_FAILURE: {
      console.log('Deu erro =(');
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }
    case types.REGISTER_UPDATED_SUCCESS: {
      const newState = { ...state };

      console.log(action.payload);

      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      console.log(newState);
      return newState;
    }
    case types.REGISTER_CREATED_SUCCESS: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    case types.REGISTER_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }

    default:
      return state;
  }
}
