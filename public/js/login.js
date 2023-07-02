let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

// Handle submit on sign-in form 

signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    email = email.toLowerCase()
    let password = document.querySelector('#sign-in-password').value;

    if(email == '' || password == ''){
        alert('Please enter a valid email and password.')
    } else {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: password
            })
        }).then((response) => response.json())
        .then((data) => {
            document.querySelector('#sign-in-email').value = "";
            document.querySelector('#sign-in-password').value = "";
            let redirectURL = data.redirectURL;
            if(redirectURL) {
                window.location.href = redirectURL
            } else {
                alert('Your email and password do not match. Please try again!');
            }
        });
    }
});

// Handle submit on register form 

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-reenter-password').value;

    if(password !== rePassword){
        alert('Passwords do not match.')
        return;
    }

    if(email == '' || password == '' || rePassword == ''){
        alert('Please enter a valid email and password.')
    } else {
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: password
            })
        }).then((response) => response.json())
        .then((data) => {
            alert(data.message);
            document.querySelector('#register-email').value = "";
            document.querySelector('#register-password').value = "";
            document.querySelector('#register-reenter-password').value = "";
        });
    }
})