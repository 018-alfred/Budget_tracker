


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

    if(savings > 0){
        document.getElementById("statusMessage").innerText =
        "Excellent annual financial performance.";
    }
    else if(savings === 0){
        document.getElementById("statusMessage").innerText =
        "Income and expenses are balanced.";
    }
    else{
        document.getElementById("statusMessage").innerText =
        "Expenses exceed annual income.";
    }

    updateBreakdown();

    createCharts(
        income,
        expense
    );

    let advice = "";

    if(savingRate >= 20){

        advice =
        "✅ Strong saving rate. Continue investing and growing your wealth.";

    }
    else if(savingRate >= 10){

        advice =
        "👍 Good progress. Try increasing savings above 20%.";

    }
    else{

        advice =
        "⚠ Consider reducing non-essential expenses and improving savings.";

    }

    document.getElementById("adviceBox").innerHTML =
        advice;
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

async function saveAnnualBudget() {

    const token = await window.getClerkToken();

    const year =
    document.getElementById("year").value;

    const totalIncome =
    Number(
      document.getElementById("incomeResult")
      .innerText.replace(/[₹,]/g,"")
    );

    const totalExpense =
    Number(
      document.getElementById("expenseResult")
      .innerText.replace(/[₹,]/g,"")
    );

    const savings =
    Number(
      document.getElementById("savingResult")
      .innerText.replace(/[₹,]/g,"")
    );

    const response = await fetch(
      `${API_URL}/annual`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          year,
          totalIncome,
          totalExpense,
          savings
        })
      }
    );

    if(response.ok){

      alert("Annual Budget Saved");

await loadAnnualBudgets();

    }else{

      alert("Failed To Save");

    }

}

async function downloadAnnualReport(){

    const reportSection =
    document.querySelector(".annual-layout");

    const canvas =
    await html2canvas(reportSection,{
        scale:2,
        useCORS:true,
        backgroundColor:"#ffffff"
    });

    const imgData =
    canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf =
    new jsPDF("p","mm","a4");

    const pageWidth =
    pdf.internal.pageSize.getWidth();

    const pageHeight =
    pdf.internal.pageSize.getHeight();

    const imgWidth =
    pageWidth;

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

    heightLeft -= pageHeight;

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

        heightLeft -= pageHeight;
    }

    const year =
    document.getElementById("year").value || "Report";

    pdf.save(
        `AnnualBudget-${year}.pdf`
    );
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
async function loadAnnualBudgets() {

  try {

    const token =
    await window.getClerkToken();

    const container =
    document.getElementById(
      "annualBudgetList"
    );

    if(!container) return;

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

    if(!response.ok){
      throw new Error(
        "Failed to load annual budgets"
      );
    }

    const budgets =
    await response.json();

    console.log(
      "Annual Budgets:",
      budgets
    );

    if(budgets.length === 0){

      container.innerHTML =
      "<p>No Annual Budgets Saved</p>";

      return;

    }

    container.innerHTML = "";

    budgets.forEach((budget)=>{

      container.innerHTML += `

      <div class="record-card">

        <div class="record-info">

          <h4>${budget.year}</h4>

          <p>
          Income:
          ₹${budget.total_income}
          </p>

          <p>
          Expense:
          ₹${budget.total_expense}
          </p>

          <p>
          Savings:
          ₹${budget.savings}
          </p>

        </div>

        <div class="record-actions">

          <button
          class="btn delete-btn"
          onclick="deleteAnnual(${budget.id})">

          Delete

          </button>

        </div>

      </div>

      `;

    });

  }
  catch(error){

    console.error(error);

  }

}

async function deleteAnnual(id){

    const token =
    await window.getClerkToken();

    const response =
    await fetch(
      `${API_URL}/annual/${id}`,
      {
        method:"DELETE",
        headers:{
          "Authorization":
          `Bearer ${token}`
        }
      }
    );

    if(response.ok){

      loadAnnualBudgets();

    }else{

      alert("Delete Failed");

    }

}
document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadAnnualBudgets();
  }
);