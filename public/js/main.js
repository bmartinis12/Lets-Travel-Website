// Fetchs post data from database 

async function getPosts() {
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data)
}

// Creates posts on the homepage when DOM is loaded

document.addEventListener('DOMContentLoaded', async function() {
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
            <div class="col-10 offset-1 offset-sm-0 col-sm-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <a href="/landmark?id=${post.id}" class="btn btn-primary text-nowrap">Details</a>
                    </div>
                </div>
            </div>
        `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
});

// Fetch a post request to the database when user submits callback request form

let callForm = document.querySelector('.call-form');
let phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

callForm.addEventListener('submit', function(e){
    e.preventDefault();
    let phoneInput = callForm.querySelector('input');
    if(phoneNumberRegex.test(phoneInput.value)){
        fetch('/callback-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber: phoneInput.value
            })
        }).then((response) => response.text())
        .then(() => {
            alert('We will call you back as soon as possible!');
            phoneInput.value = "";
        });
    } else {
        alert('Please enter a valid phone number.');
        phoneInput.value = "";
    }
});

// Fetch a post request to the database when user submits the email form

let emailForm = document.querySelector('.email-form');

emailForm.addEventListener('submit', function(e){
    e.preventDefault();
    let name = document.querySelector('#nameInput');
    let email = document.querySelector('#inputEmail');
    let text = document.querySelector('#inputMessage');
    if(text.value == '' || email.value == '' || name.value == ''){
        alert('Please fill in all feilds.');
    } else {
        fetch('/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                text: text.value
            })
        }).then((response) => response.text())
        .then((data) => {
            alert('We will email you back as soon as possible!');
            name.value = "";
            email.value = "";
            text.value = "";
        });
    }
});

