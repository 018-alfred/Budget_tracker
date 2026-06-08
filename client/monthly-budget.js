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

function saveBudget() {

    const month =
    document.getElementById("month").value;

    const year =
    document.getElementById("year").value;

    const totalIncome =
    Number(document.getElementById("incomeResult")
    .innerText.replace(/[₹,]/g, ""));

    const totalExpense =
    Number(document.getElementById("expenseResult")
    .innerText.replace(/[₹,]/g, ""));

    const savings =
    Number(document.getElementById("savingResult")
    .innerText.replace(/[₹,]/g, ""));

    const budget = {
        month,
        year,
        totalIncome,
        totalExpense,
        savings
    };

    let budgets =
    JSON.parse(
        localStorage.getItem("monthlyBudgets")
    ) || [];

    budgets.push(budget);

    localStorage.setItem(
        "monthlyBudgets",
        JSON.stringify(budgets)
    );

    alert("Monthly Budget Saved Successfully");
}

/* Download */

async function downloadReport(){

    const { jsPDF } = window.jspdf;

    const reportSection =
    document.querySelector(".container");

    const canvas =
    await html2canvas(reportSection,{
        scale:2,
        useCORS:true
    });

    const imgData =
    canvas.toDataURL("image/png");

    const pdf =
    new jsPDF("p","mm","a4");

    const pdfWidth =
    pdf.internal.pageSize.getWidth();

    const pdfHeight =
    pdf.internal.pageSize.getHeight();

    const imgWidth =
    pdfWidth;

    const imgHeight =
    (canvas.height * imgWidth) /
    canvas.width;

    let heightLeft =
    imgHeight;

    let position = 0;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
    );

    heightLeft -= pdfHeight;

    while(heightLeft > 0){

        position =
        heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
            imgData,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight
        );

        heightLeft -= pdfHeight;
    }

    pdf.save("MonthlyBudgetReport.pdf");
}
function loadMonthlyBudgets() {

    const container =
    document.getElementById(
        "monthlyBudgetList"
    );

    const budgets =
    JSON.parse(
        localStorage.getItem(
            "monthlyBudgets"
        )
    ) || [];

    if (!container) return;

    if (budgets.length === 0) {

        container.innerHTML =
        "<p>No Monthly Budgets Saved</p>";

        return;
    }

    container.innerHTML = "";

    budgets.forEach((budget,index) => {

        container.innerHTML += `

        <div class="record-card">

            <div class="record-info">

                <h4>
                    ${budget.month} ${budget.year}
                </h4>

                <p>
                    Income: ₹${budget.totalIncome}
                </p>

                <p>
                    Expense: ₹${budget.totalExpense}
                </p>

                <p>
                    Savings: ₹${budget.savings}
                </p>

            </div>

            <div class="record-actions">

                <button
                    class="btn delete-btn"
                    onclick="deleteMonthly(${index})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}
function deleteMonthly(index) {

    let budgets =
    JSON.parse(
        localStorage.getItem(
            "monthlyBudgets"
        )
    ) || [];

    budgets.splice(index,1);

    localStorage.setItem(
        "monthlyBudgets",
        JSON.stringify(budgets)
    );

    loadMonthlyBudgets();
}
