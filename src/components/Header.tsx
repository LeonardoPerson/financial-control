import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';
import { User, Wallet } from '../types';

function Header() {
  const user = useSelector((state: { user: User }) => state.user);
  const wallet = useSelector((state: { wallet: Wallet }) => state.wallet);
  const userEmailLogged = localStorage.getItem("financial-control-login");
  const userEmail = user.email ? user.email : (userEmailLogged ? userEmailLogged : "");
  const totalExpenseTreatment = () => {
    const totalExpenseValue = wallet.totalExpense ? wallet.totalExpense.toFixed(2) : 0;
    return totalExpenseValue;
  };

  return (
    <div className="header-container">
      <div className="header-informative">
        <div className="header-column">
          <span className="header-item">
            Email:
          </span>
          <span className="" data-testid="email-field">
            {userEmail}
          </span>
        </div>
        <div className="header-column">
          <span className="header-item">
            Despesa total:
          </span>
          <span className="header-item" data-testid="total-field">
            {totalExpenseTreatment()}
          </span>
          <span className="header-item" data-testid="header-currency-field">
            {wallet.currencieChoosed}
          </span>
        </div>
      </div>
      <a href="/" className="header-action">
        Logout
      </a>
    </div>

  );
}

export default Header;
