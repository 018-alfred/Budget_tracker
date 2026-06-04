let selectedYears = [];

let barChart = null;
let pieChart = null;

loadAnnualBudgets();

function loadAnnualBudgets(){

    const annualBudgets =
    JSON.parse(
        localStorage.getItem(
        "annualBudgets"
        )
    ) || [];

    const selector =
    document.getElementById(
    "yearSelector"
    );

    selector.innerHTML = "";

    annualBudgets.forEach((budget,index)=>{

        selector.innerHTML += `
        <option value="${index}">
            ${budget.year}
        </option>
        `;
    });
}

function generateFiveYearAnalysis(){

    const annualBudgets =
    JSON.parse(
        localStorage.getItem(
        "annualBudgets"
        )
    ) || [];

    const options =
    document.getElementById(
    "yearSelector"
    ).selectedOptions;

    selectedYears = [];

    for(let option of options){

        selectedYears.push(
            annualBudgets[
                option.value
            ]
        );
    }

    if(selectedYears.length !== 5){

        alert(
        "Please select exactly 5 years."
        );

        return;
    }

    let totalIncome = 0;
    let totalExpense = 0;
    let totalSavings = 0;

    const labels = [];
    const incomeData = [];
    const expenseData = [];
    const savingsData = [];

    selectedYears.forEach(year=>{

        totalIncome += year.totalIncome;
        totalExpense += year.totalExpense;
        totalSavings += year.savings;

        labels.push(year.year);

        incomeData.push(
            year.totalIncome
        );

        expenseData.push(
            year.totalExpense
        );

        savingsData.push(
            year.savings
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

    generateGrowthAnalysis(
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

    if(barChart) barChart.destroy();

    barChart = new Chart(
    document.getElementById(
    "barChart"
    ),
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

    if(pieChart) pieChart.destroy();

    pieChart = new Chart(
    document.getElementById(
    "pieChart"
    ),
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

function generateGrowthAnalysis(
income,
expense,
savings
){

    let result = "";

    if(savings > expense){

        result =
        "Excellent financial growth. Savings exceed total expenses.";

    }else if(savings > 0){

        result =
        "Positive financial performance with healthy savings.";

    }else{

        result =
        "Expenses exceed income. Budget adjustment recommended.";
    }

    document.getElementById(
    "growthAnalysis"
    ).innerText = result;
}

function downloadReport(){

    const { jsPDF } =
    window.jspdf;

    const doc =
    new jsPDF();

    doc.text(
    "5-Year Budget Report",
    20,
    20
    );

    doc.text(
    document.getElementById(
    "incomeResult"
    ).innerText,
    20,
    50
    );

    doc.text(
    document.getElementById(
    "expenseResult"
    ).innerText,
    20,
    70
    );

    doc.text(
    document.getElementById(
    "savingResult"
    ).innerText,
    20,
    90
    );

    doc.text(
    document.getElementById(
    "savingRate"
    ).innerText,
    20,
    110
    );

    doc.save(
    "FiveYearBudgetReport.pdf"
    );
}