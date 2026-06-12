

let selectedBudgets = [];

let barChart = null;
let pieChart = null;

window.addEventListener("load", async () => {

    while(typeof Clerk === "undefined"){
        await new Promise(resolve =>
            setTimeout(resolve,100)
        );
    }

    await Clerk.load();

    loadMonths();

});

async function loadMonths(){

    try{

        const token = await window.getClerkToken();

        if(!token){
            console.log("No token yet");
            return;
        }

        const response = await fetch(
            `${API_URL}/monthly`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        const budgets = await response.json();

        if(!Array.isArray(budgets)){
            console.error("Invalid response:", budgets);
            return;
        }

        const selector =
        document.getElementById("monthSelector");

        selector.innerHTML = "";

        budgets.forEach((budget)=>{

            selector.innerHTML += `
            <option value="${budget.id}">
                ${budget.month} ${budget.year}
            </option>
            `;

        });

    }
    catch(error){

        console.error("Load Months Error:", error);

    }

}


async function generateYearAnalysis() {

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

        const options =
        document.getElementById(
            "monthSelector"
        ).selectedOptions;

        selectedBudgets = [];

        for (let option of options) {

            const budget =
            budgets.find(
                b => b.id == option.value
            );

            if (budget) {
                selectedBudgets.push(budget);
            }
        }

        if (selectedBudgets.length === 0) {

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

        selectedBudgets.forEach(budget => {

            totalIncome +=
            Number(budget.total_income);

            totalExpense +=
            Number(budget.total_expense);

            totalSavings +=
            Number(budget.savings);

            labels.push(
                `${budget.month}`
            );

            incomeData.push(
                Number(budget.total_income)
            );

            expenseData.push(
                Number(budget.total_expense)
            );

            savingsData.push(
                Number(budget.savings)
            );

        });

        const savingRate =
        totalIncome > 0
            ? (totalSavings / totalIncome) * 100
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
    catch (error) {

        console.error(error);
        alert("Failed to generate analysis");

    }

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

async function saveAnnualBudget(){

    try{

        if(
            selectedBudgets.length === 0
        ){
            alert(
            "Generate analysis first"
            );
            return;
        }

        let totalIncome = 0;
        let totalExpense = 0;
        let totalSavings = 0;

        selectedBudgets.forEach(
        budget=>{

            totalIncome +=
            Number(
            budget.total_income
            );

            totalExpense +=
            Number(
            budget.total_expense
            );

            totalSavings +=
            Number(
            budget.savings
            );

        });

        const token =
        await window.getClerkToken();

        const response =
        await fetch(
            `${API_URL}/annual`,
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json",
                    Authorization:
                    `Bearer ${token}`
                },
                body:JSON.stringify({
                    year:
                    new Date()
                    .getFullYear(),

                    totalIncome,
                    totalExpense,
                    savings:
                    totalSavings
                })
            }
        );

        if(!response.ok){

            throw new Error(
            "Save Failed"
            );

        }

        alert(
        "Annual Budget Saved"
        );

    }
    catch(error){

        console.error(error);

        alert(
        "Failed To Save"
        );

    }

}
window.addEventListener(
    "load",
    loadMonths
);
