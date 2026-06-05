let initialBudget = 0;
let totalSpent = 0;
let expenses = [];
let chart;

function setBudget() {

    initialBudget = Number(
        document.getElementById("initialAmount").value
    );

    document.getElementById("showInitial").innerText =
        "₹" + initialBudget;

    document.getElementById("showRemaining").innerText =
        "₹" + initialBudget;
}

function addExpense() {

    const label =
        document.getElementById("expenseLabel").value;

    const amount =
        Number(document.getElementById("expenseAmount").value);

    if (!label || amount <= 0) {
        alert("Please enter a valid expense.");
        return;
    }

    expenses.push({
        label,
        amount
    });

    totalSpent += amount;

    let remaining =
        initialBudget - totalSpent;

    document.getElementById("showSpent").innerText =
        "₹" + totalSpent;

    document.getElementById("showRemaining").innerText =
        "₹" + remaining;

    let percentage =
        (totalSpent / initialBudget) * 100;

    document.getElementById("progressFill").style.width =
        Math.min(percentage, 100) + "%";

    document.getElementById("expenseLabel").value = "";
    document.getElementById("expenseAmount").value = "";
}

function generateSummary() {

    let remaining =
        initialBudget - totalSpent;

    const table =
        document.getElementById("summaryTable");

    table.innerHTML = "";

    table.innerHTML += `
        <tr>
            <td>Initial Budget</td>
            <td>₹${initialBudget}</td>
        </tr>
    `;

    expenses.forEach(expense => {

        table.innerHTML += `
            <tr>
                <td>${expense.label}</td>
                <td>₹${expense.amount}</td>
            </tr>
        `;

    });

    table.innerHTML += `
        <tr>
            <td><strong>Total Spent</strong></td>
            <td><strong>₹${totalSpent}</strong></td>
        </tr>

        <tr>
            <td><strong>Remaining Amount</strong></td>
            <td><strong>₹${remaining}</strong></td>
        </tr>
    `;

    const ctx = document.getElementById("budgetChart");

if (chart) {
    chart.destroy();
}

// Get expense labels and amounts
const labels = expenses.map(expense => expense.label);
const amounts = expenses.map(expense => expense.amount);

// Colors for categories
const colors = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#6366f1",
    "#84cc16"
];

chart = new Chart(ctx, {
    type: "pie",

    data: {
        labels: labels,

        datasets: [{
            data: amounts,
            backgroundColor: colors.slice(0, labels.length)
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                position: "bottom"
            },

            title: {
                display: true,
                text: "Expense Breakdown"
            }
        }
    }
});

}

function resetBudget() {

    initialBudget = 0;
    totalSpent = 0;
    expenses = [];

    document.getElementById("initialAmount").value = "";
    document.getElementById("expenseLabel").value = "";
    document.getElementById("expenseAmount").value = "";

    document.getElementById("showInitial").innerText = "₹0";
    document.getElementById("showRemaining").innerText = "₹0";
    document.getElementById("showSpent").innerText = "₹0";

    document.getElementById("progressFill").style.width = "0%";

    const table =
        document.getElementById("summaryTable");

    table.innerHTML = `
        <tr>
            <td>Initial Budget</td>
            <td>₹0</td>
        </tr>

        <tr>
            <td><strong>Total Spent</strong></td>
            <td><strong>₹0</strong></td>
        </tr>

        <tr>
            <td><strong>Remaining Amount</strong></td>
            <td><strong>₹0</strong></td>
        </tr>
    `;

    if (chart) {
        chart.destroy();
        chart = null;
    }
}