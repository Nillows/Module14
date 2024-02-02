// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-contents');
    const currentPost = sessionStorage.getItem("currentPost");

    // const getComments = function() {
    //     fetch(`/api/comments/onpost/${currentPost}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         // Process and display comments
    //     })
    //     .catch(err => {
    //         console.error("Error fetching comments:", err);
    //     });
    // };

    // Check if the comment form exists
    if (commentForm) {
        // Add a submit event listener to the comment form
        commentForm.addEventListener('submit', e => {
            e.preventDefault();
            // Create a new comment object with contents and the current post ID
            const newComment = {
                contents: commentInput.value,
                postId: currentPost
            };
            // Send a POST request to the server to create a new comment
            fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newComment)
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                location.reload(); // Reload the page after the comment is posted
            })
            .catch(err => {
                console.error("Error!", err);
            });
        });
    }

});