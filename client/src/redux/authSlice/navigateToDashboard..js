export const navigateToDashboard = (history, isAdmin) => {
  if (isAdmin) {
    history.push("/admin/dashboard");
  } else {
    history.push("/client/dashboard");
  }
};
