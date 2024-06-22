import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1b1b1b;
    color: #e0e0e0;
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ContractForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2c2c2c;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Label = styled.label`
  margin: 10px 0;
  font-weight: bold;
`;

const Input = styled.input`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  background-color: #3d3d3d;
  color: #e0e0e0;
`;

const Select = styled.select`
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 3px;
  background-color: #3d3d3d;
  color: #e0e0e0;
`;

const Button = styled.button`
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

const Summary = styled.div`
  margin-top: 20px;
  text-align: center;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const App = () => {
  const [contracts, setContracts] = useState([
    {
      strike_price: 100,
      type: "Call",
      bid: 10.05,
      ask: 12.04,
      long_short: "long",
      expiration_date: "2025-12-17T00:00:00Z"
    },
  ]);

  const handleChange = (index, field, value) => {
    const newContracts = [...contracts];
    newContracts[index][field] = field === 'strike_price' || field === 'bid' || field === 'ask' ? parseFloat(value) : value;
    setContracts(newContracts);
  };

  const addContract = () => {
    setContracts([...contracts, {
      strike_price: 100,
      type: "Call",
      bid: 10.05,
      ask: 12.04,
      long_short: "long",
      expiration_date: "2025-12-17T00:00:00Z"
    }]);
  };

  const calculateData = () => {
    const data = [];
    let maxProfit = -Infinity;
    let maxLoss = Infinity;
    let breakEvenPoints = new Set();
    const minPrice = 0;
    const maxPrice = Math.max(...contracts.map(c => c.strike_price)) * 2;

    for (let price = minPrice; price <= maxPrice; price += 1) {
      let profit = 0;
      contracts.forEach(contract => {
        const premium = (contract.bid + contract.ask) / 2;
        if (contract.type === 'Call') {
          const intrinsicValue = Math.max(0, price - contract.strike_price);
          profit += contract.long_short === 'long' ? intrinsicValue - premium : premium - intrinsicValue;
        } else {
          const intrinsicValue = Math.max(0, contract.strike_price - price);
          profit += contract.long_short === 'long' ? intrinsicValue - premium : premium - intrinsicValue;
        }
      });
      data.push({ price, profit: profit >= 0 ? profit : undefined, loss: profit <= 0 ? profit: undefined });
      maxProfit = Math.max(maxProfit, profit);
      maxLoss = Math.min(maxLoss, profit);

      if (Math.abs(profit) < 0.1) {
        breakEvenPoints.add(price.toFixed(2));
      }
    }

    return { data, maxProfit, maxLoss, breakEvenPoints: Array.from(breakEvenPoints) };
  };

  const { data, maxProfit, maxLoss, breakEvenPoints } = calculateData();

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Options Strategy Risk & Reward Analysis</h1>
        {contracts.map((contract, index) => (
          <ContractForm key={index}>
            <h3>Contract {index + 1}</h3>
            <Label>
              Strike Price:
              <Input
                type="number"
                value={contract.strike_price}
                onChange={(e) => handleChange(index, 'strike_price', e.target.value)}
              />
            </Label>
            <Label>
              Type:
              <Select
                value={contract.type}
                onChange={(e) => handleChange(index, 'type', e.target.value)}
              >
                <option value="Call">Call</option>
                <option value="Put">Put</option>
              </Select>
            </Label>
            <Label>
              Bid:
              <Input
                type="number"
                value={contract.bid}
                onChange={(e) => handleChange(index, 'bid', e.target.value)}
              />
            </Label>
            <Label>
              Ask:
              <Input
                type="number"
                value={contract.ask}
                onChange={(e) => handleChange(index, 'ask', e.target.value)}
              />
            </Label>
            <Label>
              Long/Short:
              <Select
                value={contract.long_short}
                onChange={(e) => handleChange(index, 'long_short', e.target.value)}
              >
                <option value="long">Long</option>
                <option value="short">Short</option>
              </Select>
            </Label>
          </ContractForm>
        ))}
        <Button onClick={addContract}>Add Contract</Button>
        <LineChart width={800} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="price" stroke="#e0e0e0" />
          <YAxis stroke="#e0e0e0" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profit" stroke="#32CD32" dot={false} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="loss" stroke="#B22222"  dot={false} activeDot={{ r: 8 }} />
        </LineChart>
        <Summary>
          <h2>Summary</h2>
          <p>Max Profit: {maxProfit}</p>
          <p>Max Loss: {maxLoss}</p>
          <p>Break-even Points: {breakEvenPoints.join(', ')}</p>
        </Summary>
      </Container>
    </>
  );
};

export default App;
