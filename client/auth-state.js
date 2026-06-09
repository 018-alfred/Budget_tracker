window.addEventListener("load", async () => {
  try {
    await Clerk.load();

    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const userButton = document.getElementById("user-button");

    if (Clerk.user) {
      // Hide Login & Sign Up
      if (loginLink) loginLink.style.display = "none";
      if (signupLink) signupLink.style.display = "none";

      // Show Clerk user menu
      if (userButton) {
        Clerk.mountUserButton(userButton);
      }
    }

  } catch (error) {
    console.error(error);
  }
});