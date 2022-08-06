import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Form = styled.form`
margin-top: 20px;
display: flex;
flex-direction: column;

label{
  width: 180px;
  height: 180px;
  display: flex;
  background: #eee;
  align-items: center;
  justify-content: center;
  border: 5px dashed ${primaryColor};
  margin: 30px auto;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
}
img{
  width: 180px;
  height: 180px;
}

input{
  display: none;
}
`;
export const Title = styled.h1`
text-align: center;
`;
