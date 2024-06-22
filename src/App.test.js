import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';


describe('Unit Testing : ARIES-REACT_CHALLENGE', () => {

test('renders the app and checks for the main heading', () => {
  render(<App />);
  // Check if the main heading is rendered
  expect(screen.getByText(/Options Strategy Risk & Reward Analysis/i)).toBeInTheDocument();
});

test('adds a contract and verifies the count', () => {
  render(<App />);
  // Check initial count of contract forms
  expect(screen.getAllByText(/Contract \d+/).length).toBe(1);

  // Add a new contract
  fireEvent.click(screen.getByText(/Add Contract/i));
  
  // Check the count of contract forms after adding
  expect(screen.getAllByText(/Contract \d+/).length).toBe(2);
});

test('check if the graph is rendered', () => {
  render(<App />);
  // Check if the LineChart component is rendered by looking for an SVG element
  const lineChart = document.querySelector('svg.recharts-surface');
  expect(lineChart).toBeInTheDocument();
});

test('check if summary box is displayed', () => {
  render(<App />);
  // Check if the Summary section is rendered
  expect(screen.getByText(/Summary/i)).toBeInTheDocument();
  expect(screen.getByText(/Max Profit/i)).toBeInTheDocument();
  expect(screen.getByText(/Max Loss/i)).toBeInTheDocument();
  expect(screen.getByText(/Break-even Points/i)).toBeInTheDocument();
})

})