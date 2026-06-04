let totalIncome = 0;
let totalExpense = 0;
let savings = 0;
let savingRate = 0;

function getValue(id){
    return Number(
        document.getElementById(id).value
    ) || 0;
}

function calculateAnnualBudget(){

    totalIncome =

        getValue("salary") +
        getValue("business") +
        getValue("freelance") +
        getValue("investment") +
        getValue("otherIncome");

    totalExpense =

        getValue("housing") +
        getValue("food") +
        getValue("transport") +
        getValue("utilities") +
        getValue("healthcare") +
        getValue("education") +
        getValue("insurance") +
        getValue("shopping") +
        getValue("entertainment") +
        getValue("others");

    savings =
    totalIncome - totalExpense;

    savingRate =
    totalIncome > 0
    ? (savings / totalIncome) * 100
    : 0;

    document.getElementById("incomeResult")
    .innerText = `₹${totalIncome}`;

    document.getElementById("expenseResult")
    .innerText = `₹${totalExpense}`;

    document.getElementById("savingResult")
    .innerText = `₹${savings}`;

    document.getElementById("savingRate")
    .innerText = `${savingRate.toFixed(2)}%`;
}

function saveAnnualBudget(){

    calculateAnnualBudget();

    const budget = {

        year:
        document.getElementById("year").value,

        totalIncome,
        totalExpense,
        savings,
        savingRate
    };

    const annualBudgets =

    JSON.parse(
    localStorage.getItem(
    "annualBudgets"
    )) || [];

    annualBudgets.push(budget);

    localStorage.setItem(
        "annualBudgets",
        JSON.stringify(annualBudgets)
    );

    alert("Annual Budget Saved");
}

function resetAnnualForm(){

    document
    .querySelectorAll("input")
    .forEach(input=>{
        input.value="";
    });
}

function downloadAnnualReport(){

    calculateAnnualBudget();

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text(
    "Annual Budget Report",
    20,
    20
    );

    doc.text(
    `Income: ₹${totalIncome}`,
    20,
    50
    );

    doc.text(
    `Expense: ₹${totalExpense}`,
    20,
    65
    );

    doc.text(
    `Savings: ₹${savings}`,
    20,
    80
    );

    doc.text(
    `Saving Rate: ${savingRate.toFixed(2)}%`,
    20,
    95
    );

    doc.save("AnnualBudget.pdf");
}  