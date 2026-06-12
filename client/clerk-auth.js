window.addEventListener("load", async () => {
  try {
    await Clerk.load();

    // If user is already signed in, redirect away from login/signup
    if (
      Clerk.user &&
      (window.location.pathname.includes("login.html") ||
       window.location.pathname.includes("signup.html"))
    ) {
      window.location.href = "/index.html";
      return;
    }

    const signInDiv = document.getElementById("clerk-signin");

    if (signInDiv) {
      Clerk.mountSignIn(signInDiv, {
        signUpUrl: "/signup.html",
        afterSignInUrl: "/index.html"
      });
    }

    const signUpDiv = document.getElementById("clerk-sign-up");

    if (signUpDiv) {
      Clerk.mountSignUp(signUpDiv, {
        signInUrl: "/login.html",
        afterSignUpUrl: "/index.html"
      });
    }

    // Navbar auth state
    const authArea = document.getElementById("auth-area");

    if (authArea) {
      if (Clerk.user) {
        const username =
          Clerk.user.firstName ||
          Clerk.user.username ||
          Clerk.user.primaryEmailAddress?.emailAddress ||
          "User";

        authArea.innerHTML = `
          <span style="margin-right:10px;">Hi, ${username}</span>
          <button id="logout-btn" style="background:var(--primary);
    color:white;padding:10px;border-radius:20px;border:none;">Logout</button>
        `;

        document
          .getElementById("logout-btn")
          .addEventListener("click", async () => {
            await Clerk.signOut();

            window.location.href = "/";
          });

      } else {
        authArea.innerHTML = `
          <a href="/login.html">Login</a>
          <a href="/signup.html">Sign Up</a>
        `;
      }
    }

  } catch (err) {
    console.error("Clerk Error:", err);
  }
});  

window.getClerkToken = async function () {

  try {

    await Clerk.load();

    if (!Clerk.session) {

      console.log("User not logged in");

      return null;
    }

    return await Clerk.session.getToken();

  } catch (error) {

    console.error("Token Error:", error);

    return null;
  }

};