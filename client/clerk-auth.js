window.addEventListener("load", async () => {
  try {
    await Clerk.load();

    const signInDiv = document.getElementById("clerk-signin");

    if (signInDiv) {
      Clerk.mountSignIn(signInDiv, {
        signUpUrl: "signup.html"
      });
    }

    const signUpDiv = document.getElementById("clerk-sign-up");

    if (signUpDiv) {
      Clerk.mountSignUp(signUpDiv, {
        signInUrl: "login.html"
      });
    }

  } catch (error) {
    console.error(error);
  }
});