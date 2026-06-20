let expenses = [],
    budget = 0,
    doughnutChart,
    barChart;

function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

function switchTab(id, el) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active-tab');
    });

    document.getElementById(id).classList.add('active-tab');

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.classList.remove('active');
    });

    if (el) {
        el.classList.add('active');
    }
}

function setBudget() {
    budget = Number(document.getElementById('budgetAmount').value);

    document.getElementById('budgetArea').innerHTML = `
        <div>
            <input id="label" placeholder="Expense Label">
            <input id="amount" type="number" placeholder="Amount">
            <button onclick="addExpense()">Add Expense</button>
        </div>

        <div style="display:flex; gap:20px; margin-top:20px;">
            <canvas id="doughnut"></canvas>
            <canvas id="bar"></canvas>
        </div>

        <table border="1" width="100%" style="margin-top:20px;">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Label</th>
                    <th>Amount</th>
                    <th>% of Budget</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="rows"></tbody>
        </table>

        <div id="warn"></div>
    `;

    render();
}

function addExpense() {
    const labelInput = document.getElementById('label');
    const amountInput = document.getElementById('amount');

    if (!labelInput.value || !amountInput.value) {
        return;
    }

    expenses.push({
        label: labelInput.value,
        amount: Number(amountInput.value)
    });

    labelInput.value = "";
    amountInput.value = "";

    render();
}

function render() {
    const spent = expenses.reduce((total, item) => {
        return total + item.amount;
    }, 0);

    document.getElementById('rows').innerHTML = expenses.map((expense, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${expense.label}</td>
            <td>${expense.amount}</td>
            <td>${((expense.amount / budget) * 100).toFixed(1)}%</td>
            <td>
                <button onclick="del(${index})">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');

    document.getElementById('warn').innerHTML =
        spent > budget
            ? '<span style="color:red;font-weight:bold;">Budget Exceeded!</span>'
            : '';

    const labels = expenses.map(item => item.label);
    const data = expenses.map(item => item.amount);

    if (document.getElementById('doughnut')) {

        if (doughnutChart) {
            doughnutChart.destroy();
        }

        if (barChart) {
            barChart.destroy();
        }

        doughnutChart = new Chart(
            document.getElementById('doughnut'),
            {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data
                    }]
                }
            }
        );

        barChart = new Chart(
            document.getElementById('bar'),
            {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data
                    }]
                }
            }
        );
    }
}

function del(index) {
    expenses.splice(index, 1);
    render();
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        document.getElementById('loginMsg').innerText =
            'Please fill all fields';
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        localStorage.setItem('token', data.token);

        document.getElementById('loginMsg').innerText =
            'Login Successful';
    }
    catch (error) {
        document.getElementById('loginMsg').innerText =
            'Login Failed';
    }
}

async function handleSignup() {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword =
        document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        document.getElementById('signupMsg').innerText =
            'Please fill all fields';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('signupMsg').innerText =
            'Passwords do not match';
        return;
    }

    try {
        await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        document.getElementById('signupMsg').innerText =
            'Account Created Successfully';

        switchTab('login');
    }
    catch (error) {
        document.getElementById('signupMsg').innerText =
            'Signup Failed';
    }
}

const video = document.getElementById("heroVideo");

video.addEventListener("click", () => {

    if (video.paused) {
        video.currentTime = 0;
        video.play();
    }

});

video.addEventListener("timeupdate", () => {

    if (video.currentTime >= 50) {
        video.currentTime = 11;
    }

});