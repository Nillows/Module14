// Get references to various HTML elements
const loginButton = document.getElementById("login-btn");
const authForm = document.getElementById("auth-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

// Check if the login button exists (used to differentiate between login and signup)
if (loginButton) {
    // Event listener for the login form submission
    authForm.addEventListener("submit", e => {
        e.preventDefault();
        // Create an object with username and password from user input
        const loginObject = {
            username: usernameInput.value,
            password: passwordInput.value
        };
        // Send a POST request to the server's login route
        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(loginObject),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            // Refresh the page before redirecting to the home page
            location.reload();
            location.href = "/";
        }).catch(err => {
            // Handle errors by logging them to the console
            console.error("Error!", err);
        });
    });
} else {
    // Event listener for the signup form submission
    authForm.addEventListener("submit", e => {
        e.preventDefault();
        // Create an object with username and password from user input
        const signupObject = {
            username: usernameInput.value,
            password: passwordInput.value
        };
        // Send a POST request to the server's signup route
        fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify(signupObject),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            // Refresh the page before redirecting to the home page
            location.reload();
            location.href = "/";
        }).catch(err => {
            // Handle errors by logging them to the console
            console.error("Error!", err);
        });
    });
}
