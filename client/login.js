window.addEventListener("DOMContentLoaded", async () => {

    await Clerk.load();

    if (Clerk.user) {
        window.location.href = "budget.html";
        return;
    }

    document
        .getElementById("loginBtn")
        .addEventListener("click", () => {

            Clerk.openSignIn({
                afterSignInUrl: "/client/signup.html",
                afterSignUpUrl: "/client/login.html"
            });

        });

});