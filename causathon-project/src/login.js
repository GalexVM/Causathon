import React, { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectToPolkadot = async () => {
      const extensions = await web3Enable('My React App');
      if (extensions.length === 0) {
        console.log('No extension found');
        return;
      }
      const accounts = await web3Accounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
        setIsLoggedIn(true);
      }
    };

    connectToPolkadot();
  }, []);

  const handleLogin = async () => {
    const accounts = await web3Accounts();
    if (accounts.length > 0) {
      setAccount(accounts[0].address);
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, your account address is {account}</h2>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Polkadot.js</button>
      )}
    </div>
  );
};

export default Login;
