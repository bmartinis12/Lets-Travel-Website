// Fetch to get posts

async function getPosts() {
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data);
}

// Fetch to get Callback requests

async function getCallbackRequests() {
    return await fetch('/callback-requests')
        .then((response) => response.json())
        .then((data) => data);
}

// Fetch to get email requests

async function getEmails() {
    return await fetch('/emails')
        .then((response) => response.json())
        .then((data) => data);
}

// When page loads functions are called

document.addEventListener('DOMContentLoaded', function() {
    addPosts();
    addCallbackRequests();
    addEmails();
    reloadTab();
    // create post 
    let addPostBtn = document.querySelector('.add-post');
    let createPost = document.querySelector('#v-pills-add-post-tab');

    addPostBtn.addEventListener('click', () => createPost.click());
})

// Initial function to add posts 

async function addPosts(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles-list tbody');
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postDate = post.date;
        let postHTML = `
            <tr>
                <td>${i++}<input class='id' type="hidden" value="${post.id}"></td>
                <td class="title">${post.title}</td>
                <td class="date">${postDate.substring(0,10)}</td>
                <td class="country">${post.country}</td>
                <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
                <td><button class="remove-btn btn btn-link p-0 text-decoration-none">x</button></td>
            </tr>
        `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

// Initial Function to add Callback Requests

async function addCallbackRequests(){
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-callback tbody');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = `
            <tr>
                <td>${i++}<input class='id' type="hidden" value="${request.id}"></td>
                <td class="title"><a class="admin-link" href="tel:+${request.phoneNumber}">+${request.phoneNumber}</a></td>
                <td class="date">${request.date.substring(0,10)}</td>
                <td><button class="remove-btn btn btn-link p-0 text-decoration-none">x</button></td>
            </tr>
        `;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}

// Fetch delete request to database when admin clicks delete icon on callback request

let requestBlock = document.querySelector('#v-pills-callback');

requestBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/callback-requests/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => {
            window.history.go();
        });
    }
})

// Initial Function to add Email requests

async function addEmails(){
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mail tbody');
    emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((email) => {
        let emailHTML = `
            <tr>
                <td>${i++}<input class='id' type="hidden" value="${email.id}"></td>
                <td class="name">${email.name}</td>
                <td class="email"><a class="admin-link" href="mailto:${email.email}">${email.email}</a></td>
                <td class="date">${email.date.substring(0,10)}</td>
                <td><button class="remove-btn btn btn-link p-0 text-decoration-none">x</button></td>
            </tr>
            <tr class='email-message'>
                <td colspan="5" class="text">${email.text}</td>
            </tr>
        `;
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}

// Fetch delete request to database when admin clicks delete icon on callback request

let emailsBlock = document.querySelector('#v-pills-mail');

emailsBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-btn')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => {
            window.history.go();
        });
    }
});

// Log out of admin page 

let logOutBtn = document.querySelector('.log-out-btn');

logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})


// Return users to their previous tab in admin after a reload

let articlesTab = document.querySelector("#v-pills-articles-tab");
let callbackTab = document.querySelector("#v-pills-callback-tab");
let emailsTab = document.querySelector("#v-pills-mail-tab");

articlesTab.addEventListener('click', function(){
    if(window.localStorage.getItem('currentTab') !== 'articles'){
        window.localStorage.setItem('currentTab', 'articles');
    }
});

callbackTab.addEventListener('click', function(){
    if(window.localStorage.getItem('currentTab') !== 'callback'){
        window.localStorage.setItem('currentTab', 'callback');
    }
});

emailsTab.addEventListener('click', function(){
    if(window.localStorage.getItem('currentTab') !== 'mails'){
        window.localStorage.setItem('currentTab', 'mails');
    }
});

function reloadTab(){
    let tab = window.localStorage.getItem('currentTab');
    if(tab == 'mails'){
        emailsTab.classList.add("active");
        document.querySelector('#v-pills-mail').classList.add('show', 'active');
        articlesTab.classList.remove("active");
        document.querySelector('#v-pills-articles').classList.remove('show', 'active');
        callbackTab.classList.remove("active");
        document.querySelector('#v-pills-callback').classList.remove('show', 'active');
    } else if (tab == 'callback'){
        callbackTab.classList.add("active");
        document.querySelector('#v-pills-callback').classList.add('show', 'active');
        articlesTab.classList.remove("active");
        document.querySelector('#v-pills-articles').classList.remove('show', 'active');
        emailsTab.classList.remove("active");
        document.querySelector('#v-pills-mail').classList.remove('show', 'active');
    } else {
        articlesTab.classList.add("active");
        document.querySelector('#v-pills-articles').classList.add('show', 'active');
        callbackTab.classList.remove("active");
        document.querySelector('#v-pills-callback').classList.remove('show', 'active');
        emailsTab.classList.remove("active");
        document.querySelector('#v-pills-mail').classList.remove('show', 'active');
    }
}