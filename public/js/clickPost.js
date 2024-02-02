// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class "view-comments-button"
    const postDivs = document.getElementsByClassName("view-comments-button");

    // Iterate through each "view-comments-button" element
    for (let i = 0; i < postDivs.length; i++) {
        // Add a click event listener to each "view-comments-button" element
        postDivs[i].addEventListener('click', e => {
            // Get the post ID from the "data-postId" attribute of the clicked element
            const postId = e.target.dataset.postId;
            
            // Store the current post ID in session storage for future use
            sessionStorage.setItem("currentPost", postId);

            // Check if a valid post ID is obtained
            if (postId) {
                // Redirect the user to the post details page with the corresponding post ID
                window.location.href = `/post/${postId}`;
            }
        });
    }
});
