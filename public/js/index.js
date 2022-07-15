/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

//:::::::: DOM :::::::::
const account = document.getElementById('accountId').value;

//?LOGIN
const loginForm = document.querySelector('.login__form');
const loginBtn = document.querySelector('#logIn_btn');
const logoutBtn = document.querySelector('#logOut_btn');
const loginEmail = document.querySelector('.login__input--user');
const loginPin = document.querySelector('.login__input--pin');

//?MOVEMENTS
const withdrawForm = document.querySelector('.form--transfer');
const withdrawTo = document.querySelector('.form__input--to');
const withdrawAmount = document.querySelector('.form__input--amount');

const depositForm = document.querySelector('.form--loan');
const depositAmount = document.querySelector('.form__input--loan-amount');

// const closeForm = document.querySelector('.form--close');
// const closeUser = document.querySelector('.form__input--user');
// const closePin = document.querySelector('.form__input--pin');

//:::::::: FUNCTIONS :::::::::
const login = async (email, password) => {
  try {
    let res = await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    //go Overview
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/users/logout',
    });

    //go Overview
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error logging out! Try again.');
  }
};

const postMovement = async (type, amount, accountId, otherId = null) => {
  try {
    let res = await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/movements',
      data: {
        type,
        amount,
        accountId,
      },
    });

    //go Overview
    if (res.data.status === 'success' && otherId === null) {
      showAlert('success', 'Movement created successfully!');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

const closeAccount = async (email, pin, accountId) => {};

//ON LOGIN SUBMIT
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPin.value;

    login(email, password);
  });
}

//ON LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    e.preventDefault();

    logout();
  });
}

//ON DEPOSIT
if (depositForm) {
  depositForm.addEventListener('submit', e => {
    e.preventDefault();

    const amount = depositAmount.value;
    console.log(amount, accountId);
    postMovement('deposit', amount, account);
  });
}

//ON TRANSFER
if (withdrawForm) {
  withdrawForm.addEventListener('submit', e => {
    e.preventDefault();

    const amount = withdrawAmount.value;
    const wdAccount = +withdrawTo.value;
    postMovement('withdraw', amount, account, wdAccount); //send
    postMovement('deposit', amount, wdAccount); //receive
  });
}

//ON CLOSE
// if (closeForm) {
//   closeForm.addEventListener('submit', e => {
//     e.preventDefault();

//     const user = closeUser.value;
//     const pin = closePin.value;
//     closeAccount(user, pin, account);
//   });
// }
