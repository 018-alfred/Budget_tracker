window.addEventListener("load", async () => {

    while (typeof Clerk === "undefined") {
        await new Promise(resolve =>
            setTimeout(resolve, 100)
        );
    }

    await Clerk.load();

    loadMonthlyBudgets();
    loadAnnualBudgets();

});


/* ======================
   MONTHLY BUDGETS
====================== */

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

        if (!budgets.length) {

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

                <div class="record-actions">

                    <button
                        class="btn delete-btn"
                        onclick="deleteMonthly(${budget.id})">

                        Delete

                    </button>

                </div>

            </div>

            `;
        });

    }
    catch (error) {

        console.error(error);

    }

}


async function deleteMonthly(id) {

    try {

        const token =
        await window.getClerkToken();

        const response =
        await fetch(
            `${API_URL}/monthly/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.ok) {

            loadMonthlyBudgets();

        } else {

            alert("Delete Failed");

        }

    }
    catch (error) {

        console.error(error);

    }

}


/* ======================
   ANNUAL BUDGETS
====================== */

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

        if (!budgets.length) {

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

                <div class="record-actions">

                    <button
                        class="btn delete-btn"
                        onclick="deleteAnnual(${budget.id})">

                        Delete

                    </button>

                </div>

            </div>

            `;
        });

    }
    catch (error) {

        console.error(error);

    }

}


async function deleteAnnual(id) {

    try {

        const token =
        await window.getClerkToken();

        const response =
        await fetch(
            `${API_URL}/annual/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.ok) {

            loadAnnualBudgets();

        } else {

            alert("Delete Failed");

        }

    }
    catch (error) {

        console.error(error);

    }

}