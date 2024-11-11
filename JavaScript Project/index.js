const transactions = JSON.parse(localStorage.getItem("transactions")) || []

const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "INR",
  signDisplay: "always",
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm")
const status = document.getElementById("status");
const balance = document.getElementById('balance')
const income = document.getElementById('income')
const expense = document.getElementById('expense')

form.addEventListener("submit", addTransaction)

function updateTotal (){
  const incomeTotal = transactions.filter((trx)=> trx.type === 'income').reduce((total, trx) => total + trx.amount, 0)
  
  const expenseTotal = transactions.filter((trx)=> trx.type === 'expense').reduce((total, trx) => total + trx.amount, 0)

  const balanceTotal = incomeTotal - expenseTotal
if (expenseTotal > balanceTotal) {
  balance.textContent = formatter.format(balanceTotal).substring(-1)
}else{
  balance.textContent = formatter.format(balanceTotal).substring(1)
}



  
  income.textContent = formatter.format(incomeTotal)
  expense.textContent = formatter.format(expenseTotal * -1)
}


function renderList() {
  list.innerHTML = "";
  status.textContent =""
  if (transactions.length === 0) {
    status.textContent = "No transaction";
    return;
  }

  transactions.forEach(({ id, name, amount, date, type }) => {

    const sign = 'income' === type ? 1 : -1

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
        </div>

        <div class="amount ${type}">
        <span>${formatter.format(amount * sign)}</span>
        </div>

        <div class="action">
        <svg defer xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick="deleteTransaction(${id})">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </div>

        `;

    list.appendChild(li);
  });
}

renderList();

updateTotal()


function deleteTransaction(id){
    const index = transactions.findIndex(trx => trx.id === id)
    transactions.splice(index, 1)

    updateTotal()
    saveTransactions()
    renderList()
}

function addTransaction(e){
    e.preventDefault()

    const formData = new FormData(this)
    
    transactions.push({
      id: transactions.length + 1,
      name: formData.get('name'),
      amount: parseFloat(formData.get('amount')),
      date: new Date(formData.get('date')),
      type: 'on' === formData.get('type') ? 'income' : 'expense' 
    })
    this.reset()
    updateTotal()
    saveTransactions()
    renderList()
}

function saveTransactions(){
  transactions.sort((x, y)=>new Date(y.date) - new Date(x.date))
  localStorage.setItem('transactions', JSON.stringify(transactions))
}