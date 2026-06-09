window.addEventListener("load", async () => {
  await Clerk.load();

  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await Clerk.signOut();

        window.location.href = "/client/index.html";
      } catch (err) {
        console.error("Logout failed:", err);
      }
    });
  }
});