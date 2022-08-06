import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

// import History from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/token/', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você foi logado!!!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    payload.history.push(payload.prevPath);
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);

    errors.map((error) => toast.error(error));
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { nome, email, password, id, history } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        nome,
        email,
        password: password || undefined,
      });
      toast.success('Edite salvo.');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        nome,
        email,
        password,
      });
      toast.success('Conta criada com sucesso.');
      yield put(actions.registerCreatedSuccess());
      history.push('/login');
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    const status = get(err, 'response.status', 0);
    if (status === 401) {
      toast.error('Você precisa logar novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }
    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
