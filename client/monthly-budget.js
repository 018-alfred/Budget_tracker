let pieChart;
let barChart;

function calculateBudget(){

    const incomeIds = [
        "salary",
        "business",
        "freelance",
        "investment",
        "otherIncome"
    ];

    const expenseIds = [
        "rent",
        "food",
        "transport",
        "utilities",
        "healthcare",
        "education",
        "shopping",
        "entertainment",
        "insurance",
        "emi",
        "others"
    ];

    let totalIncome = 0;
    let totalExpense = 0;

    incomeIds.forEach(id=>{
        totalIncome +=
        Number(document.getElementById(id).value) || 0;
    });

    expenseIds.forEach(id=>{
        totalExpense +=
        Number(document.getElementById(id).value) || 0;
    });

    const savings =
        totalIncome - totalExpense;

    const savingRate =
        totalIncome > 0
        ? ((savings / totalIncome) * 100).toFixed(1)
        : 0;

    document.getElementById("incomeResult").innerText =
        "₹" + totalIncome.toLocaleString();

    document.getElementById("expenseResult").innerText =
        "₹" + totalExpense.toLocaleString();

    document.getElementById("savingResult").innerText =
        "₹" + savings.toLocaleString();

    document.getElementById("savingRate").innerText =
        savingRate + "%";

    document.getElementById("netBalance").innerText =
        "₹" + savings.toLocaleString();

    if(savings > 0){
        document.getElementById("statusMessage").innerText =
        "Excellent! You are saving money.";
    }
    else{
        document.getElementById("statusMessage").innerText =
        "Warning! Expenses exceed income.";
    }

    createExpenseBreakdown(
        expenseIds,
        totalExpense
    );

    createPieChart(expenseIds);

    createBarChart(
        totalIncome,
        totalExpense,
        savings
    );

    generateAdvice(savingRate);
}

/* Expense Breakdown */

function createExpenseBreakdown(
    expenseIds,
    totalExpense
){

    let html = "";

    expenseIds.forEach(id=>{

        const value =
        Number(document.getElementById(id).value) || 0;

        if(value > 0){

            const percentage =
            ((value / totalExpense) * 100).toFixed(1);

            html += `
            <div class="expense-item">

                <div class="expense-row">
                    <span>${id}</span>
                    <span>
                        ₹${value.toLocaleString()}
                    </span>
                </div>

                <div class="expense-bar">
                    <div
                    class="expense-fill"
                    style="width:${percentage}%">
                    </div>
                </div>

            </div>`;
        }
    });

    document.getElementById(
        "expenseBreakdown"
    ).innerHTML = html;
}

/* Pie Chart */

function createPieChart(expenseIds){

    const labels = [];
    const data = [];

    expenseIds.forEach(id=>{

        const value =
        Number(document.getElementById(id).value) || 0;

        if(value > 0){
            labels.push(id);
            data.push(value);
        }
    });

    if(pieChart){
        pieChart.destroy();
    }

    pieChart = new Chart(
        document.getElementById("pieChart"),
        {
            type:"doughnut",

            data:{
                labels:labels,
                datasets:[{
                    data:data
                }]
            },

            options:{
                responsive:true
            }
        }
    );
}

/* Bar Chart */

function createBarChart(
    income,
    expense,
    saving
){

    if(barChart){
        barChart.destroy();
    }

    barChart = new Chart(
        document.getElementById("barChart"),
        {
            type:"bar",

            data:{
                labels:[
                    "Income",
                    "Expenses",
                    "Savings"
                ],

                datasets:[{
                    data:[
                        income,
                        expense,
                        saving
                    ]
                }]
            },

            options:{
                responsive:true
            }
        }
    );
}

/* Advice */

function generateAdvice(rate){

    let msg = "";

    if(rate >= 20){

        msg =
        "Excellent financial health. Your savings rate is above 20%.";

    }
    else if(rate >= 10){

        msg =
        "Good progress. Try increasing savings to 20%.";

    }
    else{

        msg =
        "Your savings rate is low. Consider reducing non-essential expenses.";
    }

    document.getElementById(
        "adviceBox"
    ).innerHTML = msg;
}

/* Reset */

function resetForm(){

    document
    .querySelectorAll("input")
    .forEach(input=>{
        input.value = "";
    });

    location.reload();
}

/* Save */

function saveBudget(){

    localStorage.setItem(
        "monthlyBudget",
        JSON.stringify({
            month:
            document.getElementById("month").value,

            year:
            document.getElementById("year").value
        })
    );

    alert("Budget Saved Successfully");
}

/* Download */

function downloadReport(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "BudgetTracker Monthly Report",
        20,
        20
    );

    doc.setFontSize(12);

    doc.text(
        document.getElementById("incomeResult").innerText,
        20,
        50
    );

    doc.text(
        document.getElementById("expenseResult").innerText,
        20,
        65
    );

    doc.text(
        document.getElementById("savingResult").innerText,
        20,
        80
    );

    doc.save("BudgetReport.pdf");
}
