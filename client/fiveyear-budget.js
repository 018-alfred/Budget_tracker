

let selectedYears = [];

let barChart = null;
let pieChart = null;

loadAnnualBudgets();

document.getElementById("yearSelector")
.addEventListener("change", function(){

    const selected =
    Array.from(this.selectedOptions);

    if(selected.length > 5){

        alert(
        "You can select only 5 years."
        );

        selected[
            selected.length - 1
        ].selected = false;
    }
});

async function loadAnnualBudgets(){

    const token =
    await window.getClerkToken();

    const response =
    await fetch(
        `${API_URL}/annual`,
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const annualBudgets =
    await response.json();

    const selector =
    document.getElementById(
        "yearSelector"
    );

    selector.innerHTML = "";

    annualBudgets.forEach(
    (budget)=>{

        selector.innerHTML += `
        <option value="${budget.id}">
            ${budget.year}
        </option>
        `;

    });

}

async function generateFiveYearAnalysis(){

    const token =
await window.getClerkToken();

const response =
await fetch(
 `${API_URL}/annual`,
 {
  headers:{
   Authorization:
   `Bearer ${token}`
  }
 }
);

const annualBudgets =
await response.json();

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

async function saveFiveYearAnalysis(){

 const token =
 await window.getClerkToken();

 const data = {
  totalIncome:
  document
  .getElementById(
   "incomeResult"
  )
  .innerText
  .replace(/[₹,]/g,""),

  totalExpense:
  document
  .getElementById(
   "expenseResult"
  )
  .innerText
  .replace(/[₹,]/g,""),

  savings:
  document
  .getElementById(
   "savingResult"
  )
  .innerText
  .replace(/[₹,]/g,"")
 };

 await fetch(
 `${API_URL}/fiveyear`,
 {
  method:"POST",
  headers:{
   "Content-Type":
   "application/json",
   Authorization:
   `Bearer ${token}`
  },
  body:JSON.stringify(data)
 }
 );

 alert(
 "Five Year Analysis Saved"
 );

}
