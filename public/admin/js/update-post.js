{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector("#v-pills-update-post-tab");
    let updateForm = document.querySelector(".update-post-form");
    let id;

    let titleInput = document.querySelector('#update-title');
    let textInput = document.querySelector('#update-text');

    // Fetch post info that admin wants to edit

    articlesBlock.addEventListener('click', async function(e){
        if(e.target.classList.contains('edit-btn')) {
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch(' /posts/' + id)
                .then((response) => response.json())
                .then((data) => data)

            titleInput.value = postInfo.title;
            textInput.value = postInfo.text;

            updateBtn.click();
        }
    });

    // Update posts after the Edit has been confirmed 

    updateForm.addEventListener('submit', function(e){
        e.preventDefault();
        let updateDescription;
        if(textInput.value.indexOf('.') == -1) {
            updateDescription = textInput.value;
        } else {
            updateDescription = textInput.value.substring(0, textInput.value.indexOf('.') + 1);
        }
        fetch('/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                text: textInput.value,
                description: updateDescription
            })
        }).then((response) => response.text())
        .then(() => window.history.go());
    })
}