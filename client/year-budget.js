let selectedBudgets = [];

let barChart = null;
let pieChart = null;

loadMonths();

function loadMonths(){

    const budgets =
    JSON.parse(
    localStorage.getItem("monthlyBudgets")
    ) || [];

    const selector =
    document.getElementById("monthSelector");

    selector.innerHTML = "";

    budgets.forEach((budget,index)=>{

        selector.innerHTML += `
        <option value="${index}">
            ${budget.month} ${budget.year}
        </option>
        `;
    });
}

function generateYearAnalysis(){

    const budgets =
    JSON.parse(
    localStorage.getItem("monthlyBudgets")
    ) || [];

    const options =
    document.getElementById("monthSelector")
    .selectedOptions;

    selectedBudgets = [];

    for(let option of options){

        selectedBudgets.push(
            budgets[option.value]
        );
    }

    if(selectedBudgets.length === 0){

        alert("Select months");

        return;
    }

    let totalIncome = 0;
    let totalExpense = 0;
    let totalSavings = 0;

    const labels = [];
    const incomeData = [];
    const expenseData = [];
    const savingsData = [];

    selectedBudgets.forEach(budget=>{

        totalIncome += budget.totalIncome;
        totalExpense += budget.totalExpense;
        totalSavings += budget.savings;

        labels.push(
            budget.month
        );

        incomeData.push(
            budget.totalIncome
        );

        expenseData.push(
            budget.totalExpense
        );

        savingsData.push(
            budget.savings
        );
    });

    const savingRate =
    (totalSavings / totalIncome) * 100;

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
    `₹${totalSavings}`;

    document.getElementById(
    "savingRate"
    ).innerText =
    `${savingRate.toFixed(2)}%`;

    createBarChart(
        labels,
        incomeData,
        expenseData,
        savingsData
    );

    createPieChart(
        totalIncome,
        totalExpense,
        totalSavings
    );
}

function createBarChart(
labels,
incomeData,
expenseData,
savingsData
){

    if(barChart){

        barChart.destroy();
    }

    barChart = new Chart(

    document.getElementById("barChart"),

    {
        type:"bar",

        data:{
            labels,

            datasets:[

            {
                label:"Income",
                data:incomeData
            },

            {
                label:"Expense",
                data:expenseData
            },

            {
                label:"Savings",
                data:savingsData
            }

            ]
        }
    });
}

function createPieChart(
income,
expense,
savings
){

    if(pieChart){

        pieChart.destroy();
    }

    pieChart = new Chart(

    document.getElementById("pieChart"),

    {
        type:"pie",

        data:{
            labels:[
                "Income",
                "Expense",
                "Savings"
            ],

            datasets:[{

                data:[
                    income,
                    expense,
                    savings
                ]

            }]
        }
    });
}

function saveAnnualBudget(){

    if(selectedBudgets.length === 0){

        alert(
        "Generate analysis first"
        );

        return;
    }

    let totalIncome = 0;
    let totalExpense = 0;
    let totalSavings = 0;

    selectedBudgets.forEach(budget=>{

        totalIncome += budget.totalIncome;
        totalExpense += budget.totalExpense;
        totalSavings += budget.savings;

    });

    const annualBudget = {

        year:
        new Date().getFullYear(),

        totalIncome,

        totalExpense,

        savings:
        totalSavings
    };

    const annualBudgets =

    JSON.parse(
    localStorage.getItem(
    "annualBudgets"
    )) || [];

    annualBudgets.push(
        annualBudget
    );

    localStorage.setItem(
        "annualBudgets",
        JSON.stringify(
            annualBudgets
        )
    );

    alert(
    "Annual Budget Saved"
    );
}