import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  
  useEffect(() => {
    const savedNumbers = localStorage.getItem('numberList');
    if (savedNumbers) {
      setNumbers(JSON.parse(savedNumbers));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('numberList', JSON.stringify(numbers));
  }, [numbers]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addNumber = () => {
    if (count > 0) {
      if (!numbers.includes(count)) {
        setNumbers([...numbers, count]);
      }
      setCount(0);
    }
  };

  const sortNumbers = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    const sorted = [...numbers].sort((a, b) => 
      newOrder === 'asc' ? a - b : b - a
    );
    setNumbers(sorted);
  };

  const resetList = () => {
    setNumbers([]);
  };

  const highest = numbers.length > 0 ? Math.max(...numbers) : null;
  const lowest = numbers.length > 0 ? Math.min(...numbers) : null;

  return (
    <div className="app">
      <h1>Counter & List App</h1>
      
      <div className="counter-section">
        <h2>Counter</h2>
        <div className="counter-display">{count}</div>
        <div className="counter-buttons">
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
          <button onClick={addNumber} disabled={count === 0}>
            Add to List
          </button>
        </div>
      </div>
      
      <div className="list-section">
        <h2>Number List</h2>
        <div className="list-controls">
          <button onClick={sortNumbers}>
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </button>
          <button onClick={resetList} disabled={numbers.length === 0}>
            Reset List
          </button>
        </div>
        <ul>
          {numbers.map((num, index) => (
            <li 
              key={index}
              className={
                (num === highest ? 'highest' : '') + 
                (num === lowest ? ' lowest' : '')
              }
            >
              {num}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
