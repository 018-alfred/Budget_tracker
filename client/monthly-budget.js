let totalIncome = 0;
let totalExpense = 0;
let savings = 0;
let savingRate = 0;

function getValue(id){

    return Number(
        document.getElementById(id).value
    ) || 0;
}

function calculateBudget(){

    totalIncome =

        getValue("salary") +
        getValue("business") +
        getValue("freelance") +
        getValue("investment") +
        getValue("otherIncome");

    totalExpense =

        getValue("rent") +
        getValue("food") +
        getValue("transport") +
        getValue("utilities") +
        getValue("healthcare") +
        getValue("education") +
        getValue("shopping") +
        getValue("entertainment") +
        getValue("insurance") +
        getValue("emi") +
        getValue("others");

    savings =
    totalIncome - totalExpense;

    savingRate =
    totalIncome > 0
    ? ((savings / totalIncome) * 100)
    : 0;

    document.getElementById(
    "incomeResult"
    ).innerText =
    `₹${totalIncome}`;

    document.getElementById(
    "expenseResult"
    ).innerText =
    `₹${totalExpense}`;

    document.getElementById(
    "savingResult"
    ).innerText =
    `₹${savings}`;

    document.getElementById(
    "savingRate"
    ).innerText =
    `${savingRate.toFixed(2)}%`;
}

function saveBudget(){

    calculateBudget();

    const budget = {

        month:
        document.getElementById(
        "month"
        ).value,

        year:
        document.getElementById(
        "year"
        ).value,

        totalIncome,

        totalExpense,

        savings,

        savingRate
    };

    const budgets =

    JSON.parse(
    localStorage.getItem(
    "monthlyBudgets"
    )) || [];

    budgets.push(budget);

    localStorage.setItem(
        "monthlyBudgets",
        JSON.stringify(budgets)
    );

    alert("Budget Saved Successfully");
}

function resetForm(){

    document
    .querySelectorAll("input")
    .forEach(input=>{

        input.value = "";
    });

    document.getElementById(
    "incomeResult"
    ).innerText = "₹0";

    document.getElementById(
    "expenseResult"
    ).innerText = "₹0";

    document.getElementById(
    "savingResult"
    ).innerText = "₹0";

    document.getElementById(
    "savingRate"
    ).innerText = "0%";
}

function downloadReport(){

    calculateBudget();

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
    "Monthly Budget Report",
    20,
    20
    );

    doc.setFontSize(12);

    doc.text(
    `Month: ${
    document.getElementById("month").value
    }`,
    20,
    40
    );

    doc.text(
    `Year: ${
    document.getElementById("year").value
    }`,
    20,
    50
    );

    doc.text(
    `Income: ₹${totalIncome}`,
    20,
    70
    );

    doc.text(
    `Expense: ₹${totalExpense}`,
    20,
    80
    );

    doc.text(
    `Savings: ₹${savings}`,
    20,
    90
    );

    doc.text(
    `Saving Rate: ${savingRate.toFixed(2)}%`,
    20,
    100
    );

    doc.save(
    "MonthlyBudgetReport.pdf"
    );
}