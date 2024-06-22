import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1b1b1b;
    color: #e0e0e0;
    font-family: Arial, sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ContractForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2c2c2c;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Label = styled.label`
  margin: 10px 0;
  font-weight: bold;
`;

export const Input = styled.input`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  background-color: #3d3d3d;
  color: #e0e0e0;
`;

export const Select = styled.select`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  background-color: #3d3d3d;
  color: #e0e0e0;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Summary = styled.div`
  margin-top: 20px;
  text-align: center;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;
