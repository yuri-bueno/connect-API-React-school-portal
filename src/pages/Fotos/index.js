import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/loading';
import { Form, Title } from './styled';
import axios from '../../services/axios';

export default function Fotos({ match, history }) {
  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);

        setFoto(get(data, 'Fotos[0].url'));
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        toast.error('Falha em enviar a foto');
        history.push('/');
      }
    };
    getData();
  }, [history, id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);
    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor='foto'>
          {foto ? (
            <img crossOrigin='anonymous' src={foto} alt=' Foto' />
          ) : (
            'Selecionar'
          )}
          <input type='file' id='foto' onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
