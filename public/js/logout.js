// Add a click event listener to the element with the ID "logout-btn"
document.getElementById("logout-btn").addEventListener("click", e => {
    e.preventDefault(); // Prevent the default click behavior (e.g., navigating to a link)

    // Send a DELETE request to the server's logout route
    fetch("/api/users/logout", {
        method: "DELETE"
    }).then(res => {
        // Redirect the user to the home page after successful logout
        location.href = "/";
    }).catch(err => {
        // Handle any server errors by logging them to the console
        console.error("Server error!", err);
    });
});
