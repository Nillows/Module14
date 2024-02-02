// Function to handle form submission for updating a post
function submitUpdateForm(postId, titleInput, contentsInput, form) {
    // Add a submit event listener to the update form
    form.addEventListener('submit', e => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create an updatedPost object with new title and contents from user input
        const updatedPost = {
            title: titleInput.value,
            contents: contentsInput.value
        };

        // Send a PUT request to update the post with the specified postId
        fetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        }).then(res => {
            if (res.ok) {
                // Reload the page after successful post update
                window.location.reload();
            } else {
                // Handle errors if the network response is not okay
                throw new Error(`Failed to update post: ${res.status}`);
            }
        }).catch(err => {
            // Log any errors that occur during the fetch request
            console.error("Error updating post:", err);
        });
    });
}

// Add a click event listener to all elements with the class "update-post-icon"
document.querySelectorAll(".update-post-icon").forEach(icon => {
    icon.addEventListener("click", e => {
        e.stopPropagation(); // Prevents event from bubbling up to parent elements

        // Get the postId from the "data-postId" attribute of the clicked icon
        const postId = icon.dataset.postId;
        const postCard = icon.closest('.post-card');
        const updateForm = postCard.querySelector('.update-post-form');
        const updateTitleInput = updateForm.querySelector('.update-post-title');
        const updateContentsInput = updateForm.querySelector('.update-post-contents');

        // Show the update form
        updateForm.style.display = 'block';

        // Fetch and populate the update form with existing post data
        fetch(`/api/posts/${postId}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    // Handle errors if the network response is not okay
                    throw new Error(`Failed to fetch post data: ${res.status}`);
                }
            })
            .then(postData => {
                // Populate the update form fields with the existing post data
                updateTitleInput.value = postData.title;
                updateContentsInput.value = postData.contents;
                // Call the submitUpdateForm function to handle form submission
                submitUpdateForm(postId, updateTitleInput, updateContentsInput, updateForm);
            })
            .catch(err => {
                // Log any errors that occur during the fetch request
                console.error("Error fetching post data:", err);
            });
    });
});
