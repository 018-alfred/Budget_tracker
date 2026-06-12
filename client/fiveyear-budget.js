let selectedYears = [];

let barChart = null;
let pieChart = null;

document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadAnnualBudgets();
    }
);

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

    try{

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
    catch(error){

        console.error(error);

    }

}

async function generateFiveYearAnalysis(){

    try{

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

            const budget =
            annualBudgets.find(
                b => b.id == option.value
            );

            if(budget){
                selectedYears.push(budget);
            }
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

            totalIncome +=
            Number(year.total_income);

            totalExpense +=
            Number(year.total_expense);

            totalSavings +=
            Number(year.savings);

            labels.push(year.year);

            incomeData.push(
                Number(year.total_income)
            );

            expenseData.push(
                Number(year.total_expense)
            );

            savingsData.push(
                Number(year.savings)
            );

        });

        const savingRate =
        (totalSavings / totalIncome) * 100;

        document.getElementById(
        "incomeResult"
        ).innerText =
        `₹${totalIncome.toLocaleString()}`;

        document.getElementById(
        "expenseResult"
        ).innerText =
        `₹${totalExpense.toLocaleString()}`;

        document.getElementById(
        "savingResult"
        ).innerText =
        `₹${totalSavings.toLocaleString()}`;

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
    catch(error){

        console.error(error);

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

    if(pieChart){
        pieChart.destroy();
    }

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

    }
    else if(savings > 0){

        result =
        "Positive financial performance with healthy savings.";

    }
    else{

        result =
        "Expenses exceed income. Budget adjustment recommended.";

    }

    document.getElementById(
    "growthAnalysis"
    ).innerText = result;

}

/*async function saveFiveYearAnalysis(){

    try{

        const token =
        await window.getClerkToken();

        const data = {

            totalIncome:Number(
                document
                .getElementById(
                "incomeResult"
                )
                .innerText
                .replace(/[₹,]/g,"")
            ),

            totalExpense:Number(
                document
                .getElementById(
                "expenseResult"
                )
                .innerText
                .replace(/[₹,]/g,"")
            ),

            savings:Number(
                document
                .getElementById(
                "savingResult"
                )
                .innerText
                .replace(/[₹,]/g,"")
            )

        };

        const response =
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

        if(!response.ok){

            throw new Error(
            "Failed To Save"
            );

        }

        alert(
        "Five Year Analysis Saved"
        );

    }
    catch(error){

        console.error(error);

        alert(
        "Failed To Save"
        );

    }

}*/