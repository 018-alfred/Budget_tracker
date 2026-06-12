loadMonthlyBudgets();
loadAnnualBudgets();

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadMonthlyBudgets();
        loadAnnualBudgets();

    }
);
function loadDashboard() {
    console.log(
        JSON.parse(localStorage.getItem("monthlyBudgets"))
    );
}

async function loadMonthlyBudgets() {

    try {

        const token =
        await window.getClerkToken();

        const response =
        await fetch(
            `${API_URL}/monthly`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const budgets =
        await response.json();

        const container =
        document.getElementById(
            "monthlyBudgetList"
        );

        if (budgets.length === 0) {

            container.innerHTML =
            "<p>No Monthly Budgets Saved</p>";

            return;
        }

        container.innerHTML = "";

        budgets.forEach((budget) => {

            container.innerHTML += `

            <div class="record-card">

                <div class="record-info">

                    <h4>
                        ${budget.month}
                        ${budget.year}
                    </h4>

                    <p>
                        Income:
                        ₹${budget.total_income}
                    </p>

                    <p>
                        Expense:
                        ₹${budget.total_expense}
                    </p>

                    <p>
                        Savings:
                        ₹${budget.savings}
                    </p>

                </div>

            </div>

            `;
        });

    }
    catch(error){

        console.error(error);

    }

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

async function loadAnnualBudgets() {

    try {

        const token =
        await window.getClerkToken();

        const response =
        await fetch(
            `${API_URL}/annual`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const budgets =
        await response.json();

        const container =
        document.getElementById(
            "annualBudgetList"
        );

        if (budgets.length === 0) {

            container.innerHTML =
            "<p>No Annual Budgets Saved</p>";

            return;
        }

        container.innerHTML = "";

        budgets.forEach((budget) => {

            container.innerHTML += `

            <div class="record-card">

                <div class="record-info">

                    <h4>
                        ${budget.year}
                    </h4>

                    <p>
                        Income:
                        ₹${budget.total_income}
                    </p>

                    <p>
                        Expense:
                        ₹${budget.total_expense}
                    </p>

                    <p>
                        Savings:
                        ₹${budget.savings}
                    </p>

                </div>

            </div>

            `;

        });

    }
    catch(error){

        console.error(error);

    }

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