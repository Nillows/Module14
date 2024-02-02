// Get references to various HTML elements
const postTitleInput = document.getElementById("post-title");
const postContentsInput = document.getElementById("post-contents");
const postIdInput = document.getElementById("post-id");
const isUpdateInput = document.getElementById("is-update");

// Add a submit event listener to the form with the ID "post-form"
document.getElementById("post-form").addEventListener("submit", e => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a post object with title and contents from user input
    const post = {
        title: postTitleInput.value,
        contents: postContentsInput.value
    };

    // Get the post ID and whether it's an update from hidden input fields
    const postId = postIdInput.value;
    const isUpdate = isUpdateInput.value === 'true';

    // Define the URL and HTTP method based on whether it's an update or a new post
    const url = isUpdate ? `/api/posts/${postId}` : "/api/posts";
    const method = isUpdate ? "PUT" : "POST";

    // Send a POST or PUT request to the server to create/update a post
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(data => {
        // Redirect the user to the post details page or dashboard based on the action
        window.location.href = isUpdate ? `/post/${postId}` : "/dashboard";
    }).catch(err => {
        // Handle errors by logging them to the console
        console.error("Error!", err);
    });
});
