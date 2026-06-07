const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            message.style.color = "red";
            message.textContent =
                data.message || "Login failed";
            return;
        }

        // Save token
        localStorage.setItem(
            "token",
            data.token
        );

        // Save user name
        localStorage.setItem(
            "username",
            data.name
        );

        message.style.color = "green";
        message.textContent =
            "Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "budget.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        message.style.color = "red";
        message.textContent =
            "Server connection failed";

    }
});
