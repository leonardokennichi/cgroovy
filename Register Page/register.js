document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const ageInput = document.getElementById('ageInput');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const genderBox = document.getElementById('genderBox'); 

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const ageError = document.getElementById('ageError');
    const genderError = document.getElementById('genderError');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Name cannot be empty.');
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, emailError, 'Email cannot be empty.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        const passwordValue = passwordInput.value; 
        if (passwordValue === '') {
            showError(passwordInput, passwordError, 'Password cannot be empty.');
            isValid = false;
        } else if (passwordValue.length < 8) { 
            showError(passwordInput, passwordError, 'Password must be at least 6 characters long.');
            isValid = false;
        }

        const ageValue = ageInput.value.trim();
        if (ageValue === '') {
            showError(ageInput, ageError, 'Age cannot be empty.');
            isValid = false;
        } else {
            const age = parseInt(ageValue, 10);
            if (isNaN(age)) {
                 showError(ageInput, ageError, 'Age must be a number.');
                 isValid = false;
            } else if (age < 13 || age > 100) {
                showError(ageInput, ageError, 'Age must be between 13 and 100.');
                isValid = false;
            }
        }

        let genderSelected = false;
        genderRadios.forEach(radio => {
            if (radio.checked) {
                genderSelected = true;
            }
        });
        if (!genderSelected) {
            genderError.textContent = 'Please select your gender.';
            isValid = false;
        }

        if (isValid) {
            console.log('Form is valid. Submitting...');
            form.submit(); 
        } else {
            console.log('Form validation failed.');
        }
    });

    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('error-border');
        errorElement.textContent = message;
    }

    function clearErrors() {
        const inputsWithErrors = form.querySelectorAll('.error-border');
        inputsWithErrors.forEach(input => input.classList.remove('error-border'));

        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(span => span.textContent = '');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

});