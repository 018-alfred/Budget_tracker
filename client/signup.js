const form = document.getElementById("signupForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const message =
    document.getElementById("message");

    if(password !== confirmPassword){

        message.style.color = "red";
        message.textContent =
        "Passwords do not match";

        return;
    }

    message.style.color = "green";
    message.textContent =
    "Account created successfully!";
});

window.onload = function () {

    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleGoogleSignup
    });

    google.accounts.id.renderButton(
        document.getElementById("googleSignUpBtn"),
        {
            theme: "outline",
            size: "large",
            width: "100%"
        }
    );
};

function handleGoogleSignup(response) {

    fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential: response.credential
        })
    })
    .then(res => res.json())
    .then(data => {

        localStorage.setItem("token", data.token);

        document.getElementById("message").innerHTML =
            "Google signup successful!";

        window.location.href = "budget.html";
    })
    .catch(err => {
        console.error(err);
        document.getElementById("message").innerHTML =
            "Google signup failed.";
    });
}