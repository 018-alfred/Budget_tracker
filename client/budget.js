loadMonthlyBudgets();
loadAnnualBudgets();

function loadMonthlyBudgets() {

    const container =
    document.getElementById(
    "monthlyBudgetList"
    );

    const budgets =
    JSON.parse(
    localStorage.getItem(
    "monthlyBudgets"
    )) || [];

    if(budgets.length === 0){

        container.innerHTML = `
        <p>No Monthly Budgets Saved</p>
        `;

        return;
    }

    container.innerHTML = "";

    budgets.forEach((budget,index)=>{

        container.innerHTML += `

        <div class="record-card">

            <div class="record-info">

                <h4>
                ${budget.month}
                ${budget.year}
                </h4>

                <p>
                Income:
                ₹${budget.totalIncome}
                </p>

                <p>
                Expense:
                ₹${budget.totalExpense}
                </p>

                <p>
                Savings:
                ₹${budget.savings}
                </p>

            </div>

            <div class="record-actions">

                <button
                class="btn delete-btn"
                onclick="deleteMonthly(${index})">

                Delete

                </button>

            </div>

        </div>

        `;
    });
}

function deleteMonthly(index){

    let budgets =
    JSON.parse(
    localStorage.getItem(
    "monthlyBudgets"
    )) || [];

    budgets.splice(index,1);

    localStorage.setItem(
    "monthlyBudgets",
    JSON.stringify(budgets)
    );

    loadMonthlyBudgets();
}

function loadAnnualBudgets(){

    const container =
    document.getElementById(
    "annualBudgetList"
    );

    const budgets =
    JSON.parse(
    localStorage.getItem(
    "annualBudgets"
    )) || [];

    if(budgets.length === 0){

        container.innerHTML =
        "<p>No Annual Budgets Saved</p>";

        return;
    }

    container.innerHTML = "";

    budgets.forEach((budget,index)=>{

        container.innerHTML += `

        <div class="record-card">

            <div class="record-info">

                <h4>
                ${budget.year}
                </h4>

                <p>
                Income:
                ₹${budget.totalIncome}
                </p>

                <p>
                Expense:
                ₹${budget.totalExpense}
                </p>

                <p>
                Savings:
                ₹${budget.savings}
                </p>

            </div>

            <div class="record-actions">

                <button
                class="btn delete-btn"
                onclick="deleteAnnual(${index})">

                Delete

                </button>

            </div>

        </div>

        `;
    });
}

function deleteAnnual(index){

    let budgets =
    JSON.parse(
    localStorage.getItem(
    "annualBudgets"
    )) || [];

    budgets.splice(index,1);

    localStorage.setItem(
    "annualBudgets",
    JSON.stringify(budgets)
    );

    loadAnnualBudgets();
}