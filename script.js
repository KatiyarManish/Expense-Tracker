const balance = document.querySelector(".total-bal");
const incomee = document.querySelector(".income");
const expensee = document.querySelector(".expense");

const deletebtn = document.querySelector(".delete-btn");
const list = document.querySelector(".list");
const text = document.querySelector(".text");
const amount = document.querySelector(".amount");

const submitBtn = document.querySelector(".btn");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//   update local storage

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addition(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const newTransaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(newTransaction);
    addTransactionToDom(newTransaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function generateId() {
  return Date.now() * Math.random();
}
submitBtn.addEventListener("click", addition);

function removeTransaction(id) {
  transactions = transactions.filter(function (transaction) {
    return transaction.id !== id;
  });
  updateLocalStorage();
  init();
}

function addTransactionToDom(transaction) {
  const newLi = document.createElement("li");
  newLi.classList.add(transaction.amount < 0 ? "minus" : "plus");
  newLi.innerHTML = `${transaction.text} <span>${transaction.amount}</span><button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>`;
  list.appendChild(newLi);
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDom);
  updateValues();
}

function updateValues() {
  const amounts = transactions.map(function (amt) {
    return amt.amount;
  });

  const total = amounts.reduce((acc, item) => (acc = acc + item), 0).toFixed(2);
  balance.innerHTML = `$${total}`;
  // income logic
  const income = amounts
    .filter(function (item) {
      return item > 0;
    })
    .reduce((acc, item) => (acc = acc + item), 0)
    .toFixed(2);

  incomee.innerHTML = `+$${income}`;

  // expense logic
  const expense =
    amounts
      .filter(function (item) {
        return item < 0;
      })
      .reduce((acc, item) => (acc = acc + item), 0) * -(1).toFixed(2);

  expensee.innerHTML = `-$${expense}`;
}

init();
