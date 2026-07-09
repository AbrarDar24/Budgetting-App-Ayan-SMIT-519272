let budget = 0;
let expenses = [];

loadData();

function setBudget(){

    const value = parseFloat(
        document.getElementById("budgetInput").value
    );

    if(!value || value <= 0){
        alert("Enter valid budget");
        return;
    }

    budget = value;

    saveData();
    updateSummary();

    document.getElementById("budgetInput").value = "";
}

function addExpense(){

    const title =
    document.getElementById("expenseTitle").value;

    const amount =
    parseFloat(
    document.getElementById("expenseAmount").value);

    if(title === "" || !amount){
        alert("Fill all fields");
        return;
    }

    expenses.push({
        id: Date.now(),
        title,
        amount
    });

    saveData();
    renderExpenses();

    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseAmount").value = "";
}

function renderExpenses(){

    const list =
    document.getElementById("expenseList");

    if(expenses.length === 0){

        list.innerHTML =
        `<div class="empty">No Expenses Added</div>`;

        updateSummary();
        return;
    }

    list.innerHTML = "";

    expenses.forEach(item=>{

        list.innerHTML += `
        <div class="expense-item">

            <div class="left">

                <div class="title">
                    ${item.title}
                </div>

                <div class="amount">
                    Rs ${item.amount}
                </div>

            </div>

            <div class="actions">

                <i class="fa-solid fa-pen"
                onclick="editExpense(${item.id})"></i>

                <i class="fa-solid fa-trash"
                onclick="deleteExpense(${item.id})"></i>

            </div>

        </div>
        `;
    });

    updateSummary();
}

function editExpense(id){

    const expense =
    expenses.find(e=>e.id===id);

    const title =
    prompt("Edit Title",expense.title);

    const amount =
    prompt("Edit Amount",expense.amount);

    if(title && amount){

        expense.title = title;
        expense.amount = Number(amount);

        saveData();
        renderExpenses();
    }
}

function deleteExpense(id){

    expenses =
    expenses.filter(item=>item.id!==id);

    saveData();
    renderExpenses();
}

function updateSummary(){

    const totalExpense =
    expenses.reduce(
    (sum,item)=>sum+item.amount,0);

    const balance =
    budget-totalExpense;

    document.getElementById("budgetValue")
    .innerText = budget;

    document.getElementById("expenseValue")
    .innerText = totalExpense;

    document.getElementById("balanceValue")
    .innerText = balance;
}

function saveData(){

    localStorage.setItem(
    "budget",budget);

    localStorage.setItem(
    "expenses",
    JSON.stringify(expenses));
}

function loadData(){

    budget =
    Number(localStorage.getItem("budget")) || 0;

    expenses =
    JSON.parse(
    localStorage.getItem("expenses"))
    || [];

    renderExpenses();
}