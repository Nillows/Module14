// Select all elements with the class "delete-post-icon" and add a click event listener to each
document.querySelectorAll(".delete-post-icon").forEach(icon => {
    icon.addEventListener("click", e => {
        e.stopPropagation(); // Prevents event from bubbling up to parent elements

        // Get the post ID from the "data-postId" attribute of the clicked icon
        const postId = icon.dataset.postId;

        // Confirm with the user before deleting the post
        if (confirm("Are you sure you want to delete this post?")) {
            // Send a DELETE request to the server to delete the post with the specified ID
            fetch(`/api/posts/${postId}`, {
                method: "DELETE"
            }).then(res => {
                if (res.ok) {
                    // Reload the page to remove the deleted post from the UI
                    window.location.reload();
                } else {
                    // Handle errors if the network response is not okay
                    throw new Error('Network response was not ok.');
                }
            }).catch(err => {
                // Log any errors that occur during the fetch request
                console.error("Error!", err);
            });
        }
    });
});
