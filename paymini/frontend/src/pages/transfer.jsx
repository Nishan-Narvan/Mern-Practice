import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Transfer = () => {
  const {id} = useParams(); // user you're sending to
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [me, setMe] = useState({});
  const [toUser, setToUser] = useState({});

  console.log({id})

  // 🧠 Fetch Balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data && response.data.balance !== undefined) {
            setBalance(Number(response.data.balance).toFixed(2));
          }
        } else {
          console.error('No token found');
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };
    fetchBalance();
  }, []);

  // 🧠 Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const meRes = await axios.get('http://localhost:3000/api/v1/user/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const toRes = await axios.get(`http://localhost:3000/api/v1/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          // if (meRes.data && meRes.data.user) {
            setMe(meRes.data.user);
          // }
          // if (toRes.data && toRes.data.user) {
            setToUser(toRes.data.user);
          // }
        } else {
          console.error('No token found');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // 💸 Handle transfer
  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/v1/account/transfer',
        {
          toaccountid: id,
          amount: Number(amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message + "🎉🎉");
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Transfer failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black/90 space-y-6">
      
      
        <div className="flex flex-col justify-center items-center bg-gray-100 p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-4">💸 Your Dashboard</h1>
          <h2 className="text-xl font-mono">Current Balance:</h2>
          <p className="text-2xl font-semibold text-green-600 animate-bounce mt-2 duration-800" style={{ animationDuration: '2.4s' }}>
            {balance !== null ? `₹${balance}` : 'Loading...'}
          </p>
      </div>

      {/* 👤 Transfer Info */}
      <div className="bg-white p-6 rounded-xl shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-6">Send Money</h1>

        {/* Display sender and receiver names */}
        <div className="mb-4 text-left flex flex-col items-center p-4 backdrop-blur-lg bg-white/10 rounded-lg shadow-md hover:scale-110 duration-300">
          <p className='font-mono text-lg'><strong>From:</strong> {me.firstName} {me.lastName}</p>
          <p className='font-mono text-lg mt-2'><strong>To:</strong> {toUser.firstName} {toUser.lastName}</p>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="hover:bg-gray-100/50  border border-gray-100 p-2 rounded focus:outline-none w-full mb-4"
        />

        {/* Button */}
        <button
          onClick={handleTransfer}
          className="bg-green-600 text-white px-4 py-2  hover:bg-green-700 w-full transition-all duration-200 hover:scale-105 rounded-xl "
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  );
};

export default Transfer;
