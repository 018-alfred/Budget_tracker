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