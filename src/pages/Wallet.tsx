import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

function Wallet() {
  return (
    <div className="wallet-container">
      <Header />
      <WalletForm />
      <Table />
    </div>
  );
}
export default Wallet;
