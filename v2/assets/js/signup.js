const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


const signin_form = document.getElementById('sign-in-container');
const signup_form = document.getElementById('sign-up-container');

const signin_Button = document.getElementById('submit_signin');
const signup_Button = document.getElementById('submit_signup');

const inputs = document.querySelectorAll('input[required]');

function validateForm() {11
    let isValid = true;
    for (const input of inputs) {
        if (input.ariaValueMax.trim() === '') {
            isValid = false;
            break;
        }
    }
    return isValid;
}

signin_form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
        signin_Button.disabled = false;
    }
    else {
        signin_Button.disabled = true;
        alert('Please fill in all required fields.');
    }

});

signup_form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) {
        signup_Button.disabled = false;
        alert('Thank you for signing up!');
    }
    else {
        signup_Button.disabled = true;
        alert('Please fill in all required fields.');
    }
});

inputs.forEach(input => {
    input.addEventListener('change', () => {
        if (validateForm()) {
            signin_Button.disabled = !validateForm();
            signup_Button.disabled = !validateForm();
        }
    });
})