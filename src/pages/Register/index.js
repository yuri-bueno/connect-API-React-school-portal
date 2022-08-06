/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from "validator"


import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/loading';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions'

export default function Register(props) {
  const dispath = useDispatch();

  const id = useSelector(state => state.auth.user.id)
  const nomeStored = useSelector(state => state.auth.user.nome)
  const emailStored = useSelector(state => state.auth.user.email)
  const isLoading = useSelector(state => state.auth.isLoading)

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const { history } = props;

  React.useEffect(() => {
    if (!id) return
    setNome(nomeStored)
    setEmail(emailStored)
  }, [emailStored, id, nomeStored])
  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error("Campo nome deve ter entre 3 e 255 caracteres.")
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error("E-mail invalido.")
    }

    if (!id && password.length < 6 || password.length > 50) {
      formErrors = true;

      toast.error("A senha deve ter entre 6 e 50 caracteres.")
    }

    if (formErrors) return

    dispath(actions.registerRequest({ nome, email, password, id, history }))


  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          nome:
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" />
        </label>

        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu E-mail" />
        </label>
        <label htmlFor="password">
          senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
        </label>


        <button type='submit'>{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>

    </Container>
  );
}
