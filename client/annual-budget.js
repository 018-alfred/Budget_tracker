let pieChart;
let barChart;

function value(id){
    return Number(document.getElementById(id).value) || 0;
}

function calculateAnnualBudget(){

    const income =
        value("salary") +
        value("business") +
        value("freelance") +
        value("investment") +
        value("otherIncome");

    const expense =
        value("housing") +
        value("food") +
        value("transport") +
        value("utilities") +
        value("healthcare") +
        value("education") +
        value("insurance") +
        value("shopping") +
        value("entertainment") +
        value("others");

    const savings = income - expense;

    const savingRate =
        income > 0
        ? ((savings / income) * 100).toFixed(1)
        : 0;

    document.getElementById("incomeResult").innerText =
        `₹${income.toLocaleString()}`;

    document.getElementById("expenseResult").innerText =
        `₹${expense.toLocaleString()}`;

    document.getElementById("savingResult").innerText =
        `₹${savings.toLocaleString()}`;

    document.getElementById("savingRate").innerText =
        `${savingRate}%`;

    document.getElementById("netBalance").innerText =
        `₹${savings.toLocaleString()}`;

    document.getElementById("statusMessage").innerText =
        savings >= 0
        ? "Excellent annual financial performance."
        : "Expenses exceed annual income.";

    updateBreakdown();
    createCharts(income, expense);

    document.getElementById("adviceBox").innerHTML =
        savingRate >= 20
        ? "✅ Strong saving rate. Continue investing and growing your wealth."
        : "⚠ Try reducing non-essential expenses and improve yearly savings.";
}

function updateBreakdown(){

    const categories = [
        ["Housing","housing"],
        ["Food","food"],
        ["Transport","transport"],
        ["Utilities","utilities"],
        ["Healthcare","healthcare"],
        ["Education","education"],
        ["Insurance","insurance"],
        ["Shopping","shopping"],
        ["Entertainment","entertainment"],
        ["Others","others"]
    ];

    let html = "";

    categories.forEach(item=>{
        html += `
        <div>
            ${item[0]} : ₹${value(item[1]).toLocaleString()}
        </div>`;
    });

    document.getElementById("expenseBreakdown").innerHTML = html;
}

function createCharts(income,expense){

    if(pieChart){
        pieChart.destroy();
    }

    if(barChart){
        barChart.destroy();
    }

    pieChart = new Chart(
    document.getElementById("pieChart"),
    {
        type:"pie",
        data:{
            labels:[
                "Housing",
                "Food",
                "Transport",
                "Utilities",
                "Healthcare",
                "Education",
                "Insurance",
                "Shopping",
                "Entertainment",
                "Others"
            ],
            datasets:[{
                data:[
                    value("housing"),
                    value("food"),
                    value("transport"),
                    value("utilities"),
                    value("healthcare"),
                    value("education"),
                    value("insurance"),
                    value("shopping"),
                    value("entertainment"),
                    value("others")
                ]
            }]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{
                    position:"bottom"
                }
            }
        }
    }
);

    barChart = new Chart(
        document.getElementById("barChart"),
        {
            type:"bar",
            data:{
                labels:["Income","Expenses"],
                datasets:[{
                    data:[income,expense]
                }]
            }
        }
    );
}

function saveAnnualBudget(){

    const budgetData = {
        year:document.getElementById("year").value,
        income:document.getElementById("incomeResult").innerText,
        expense:document.getElementById("expenseResult").innerText,
        savings:document.getElementById("savingResult").innerText
    };

    localStorage.setItem(
        "annualBudget",
        JSON.stringify(budgetData)
    );

    alert("Annual Budget Saved");
}

function downloadAnnualReport(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text("Annual Budget Report",20,20);

    doc.text(
        "Year : " +
        document.getElementById("year").value,
        20,
        35
    );

    doc.text(
        "Income : " +
        document.getElementById("incomeResult").innerText,
        20,
        50
    );

    doc.text(
        "Expenses : " +
        document.getElementById("expenseResult").innerText,
        20,
        65
    );

    doc.text(
        "Savings : " +
        document.getElementById("savingResult").innerText,
        20,
        80
    );

    doc.save("Annual-Budget-Report.pdf");
}

function resetAnnualForm(){

    document
    .querySelectorAll("input")
    .forEach(input => input.value = "");

    document.getElementById("incomeResult").innerText = "₹0";
    document.getElementById("expenseResult").innerText = "₹0";
    document.getElementById("savingResult").innerText = "₹0";
    document.getElementById("savingRate").innerText = "0%";

    document.getElementById("netBalance").innerText = "₹0";
    document.getElementById("statusMessage").innerText =
        "Enter annual income and expenses";

    document.getElementById("expenseBreakdown").innerHTML = "";
    document.getElementById("adviceBox").innerHTML =
        "Enter your annual budget details to get insights.";

    if(pieChart) pieChart.destroy();
    if(barChart) barChart.destroy();
}