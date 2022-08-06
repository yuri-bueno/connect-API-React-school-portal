/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { isEmail } from "validator"
import { toast } from 'react-toastify';
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'


import Loading from '../../components/loading';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from "../../store/modules/auth/actions"

export default function Login(props) {
  const dispatch = useDispatch()
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const prevPath = get(props, "location.state.prevPath", '/')

  const isLoading = useSelector(state => state.auth.isLoading)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;


    if (!isEmail(email)) {
      formErrors = true;
      toast.error("E-mail invalido.")
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;

      toast.error("Senha invalida.")
    }

    if (formErrors) return
    dispatch(actions.loginRequest({ password, email, prevPath, history }))
    /*
    try {
      await axios.post("/token/", {
        password, email
      });
      toast.success("Você fez seu cadastro")
      // history.push('/login')
    } catch (err) {

      const errors = get(err, 'response.data.errors', [])

      errors.map(error => toast.error(error))

    }
*/
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu E-mail" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
        <button type='submit'>Acessar</button>
      </Form>
    </Container>
  );
}
