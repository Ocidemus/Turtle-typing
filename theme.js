// const select = "dark";
// export default select;

// theme.js
export function getSavedTheme() {
  // Retrieve the saved theme from local storage, or use a default theme
  return localStorage.getItem("selectedTheme") || "serica_dark";
}

export function saveTheme(theme) {
  // Save the selected theme to local storage
  localStorage.setItem("selectedTheme", theme);
}

export function getUser() {
  return localStorage.getItem("user") || 1;
}

export function saveUser(user) {
  localStorage.setItem("user", user);
}
