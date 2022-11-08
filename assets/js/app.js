const balance = document.querySelector('#balance');
const money_plus = document.querySelector('#money-plus');
const money_minus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');


const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

console.log(transactions);

const addTransaction = (e) =>{
   e.preventDefault();
   if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('Please add a text and amount');
   }else{
      const transaction = {
         id: generateID(),
         text: text.value,
         amount: +amount.value
      }
      transactions.push(transaction);
      
      addTransactionToDOM(transaction);
      
      updateValues();
      
      updateLocalStorage();

      text.value = '';
      amount.value = '';
   }
};

// Generate random ID
const generateID = ()=> {
   return Math.floor(Math.random() * 100000000);
}


const addTransactionToDOM = (transaction) =>{
   const sign = transaction.amount < 0 ? '-' : '+';
   const item = document.createElement('li');
   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
   item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
   list.appendChild(item);
};

const updateValues = () =>{
   const amounts = transactions.map(transaction => transaction.amount);
   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
   const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
   const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
   balance.innerText = `$${total}`;
   money_plus.innerText = `$${income}`;
   money_minus.innerText = `$${expense}`;
};

const removeTransaction = (id) =>{
   transactions = transactions.filter(transaction => transaction.id !== id);
   
   updateLocalStorage();
   
   init();
};

const updateLocalStorage = () =>{
   localStorage.setItem('transactions', JSON.stringify(transactions));
};

const init = ()=>{
   list.innerHTML = '';
   transactions.forEach(addTransactionToDOM);
   updateValues();
};

init();


form.addEventListener('submit', addTransaction);