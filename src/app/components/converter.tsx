'use client'
import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [sourceCurrency, setSourceCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setRates(data.rates);
    };
    fetchRates();
  }, []);

  const convertCurrency = async () => {
    if (sourceCurrency !== 'USD') {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
      const data = await response.json();
      setRates(data.rates);
    }

    if (rates[targetCurrency]) {
      setConvertedAmount(amount * rates[targetCurrency]);
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-full flex items-center justify-center">
    <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Currency Converter</h1>
  
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter amount"
          />
        </div>
  
        {/* Source Currency Dropdown */}
        <div>
          <label htmlFor="sourceCurrency" className="block text-sm font-medium text-gray-700 mb-2">
            From Currency
          </label>
          <select
            id="sourceCurrency"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {['PKR', 'USD', 'EUR', 'JPY'].map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
  
        {/* Target Currency Dropdown */}
        <div>
          <label htmlFor="targetCurrency" className="block text-sm font-medium text-gray-700 mb-2">
            To Currency
          </label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {['PKR', 'USD', 'EUR', 'JPY'].map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
  
        {/* Convert Button */}
        <div>
          <button
            onClick={convertCurrency}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Convert
          </button>
        </div>
  
        {/* Converted Amount Display */}
        {convertedAmount !== null && (
          <div className="mt-6 text-center">
            <p className="text-xl font-medium text-gray-800">
              Converted Amount: <span className="font-bold">{convertedAmount.toFixed(2)} {targetCurrency}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
    );
}  
export default CurrencyConverter;
