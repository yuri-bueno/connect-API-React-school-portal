/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { toast } from 'react-toastify';


import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import Loading from '../../components/loading';

export default function Alunos() {

  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false)
    }
    getData();
  }, []);

  function handleDeleteAsk(e) {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;

    exclamation.setAttribute('display', 'block')
    e.currentTarget.remove()
  }
  async function handleDelete(e, id) {
    try {
      setIsLoading(true)
      await axios.delete(`/alunos/${id}`)
      e.target.parentElement.remove()
      setIsLoading(false)
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <NovoAluno to='/aluno/'>Criar novo aluno</NovoAluno>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img crossOrigin='anonymous' src={aluno.Fotos[0].url} alt='' />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation display="none" cursor="pointer" onClick={(e) => handleDelete(e, aluno.id)} />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
