// Register form validation

var registerForm = document.getElementById('registerForm');

if (registerForm != null) {

    var fullNameInput = document.getElementById('fullName');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var departmentInput = document.getElementById('department');
    var eventInput = document.getElementById('event');

    var fullNameError = document.getElementById('fullNameError');
    var emailError = document.getElementById('emailError');
    var phoneError = document.getElementById('phoneError');
    var departmentError = document.getElementById('departmentError');
    var eventError = document.getElementById('eventError');

    var successMsg = document.getElementById('successMsg');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var isValid = true;

        // Reset all error messages and invalid styles first
        clearError(fullNameInput, fullNameError);
        clearError(emailInput, emailError);
        clearError(phoneInput, phoneError);
        clearError(departmentInput, departmentError);
        clearError(eventInput, eventError);
        successMsg.classList.remove('show');

        // Full Name check
        if (fullNameInput.value.trim() === '') {
            showError(fullNameInput, fullNameError, 'Please enter your full name.');
            isValid = false;
        }

        // Email check
        var emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, emailError, 'Please enter your email.');
            isValid = false;
        } else if (isValidEmail(emailValue) === false) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        // Phone check
        var phoneValue = phoneInput.value.trim();
        if (phoneValue === '') {
            showError(phoneInput, phoneError, 'Please enter your phone number.');
            isValid = false;
        } else if (isValidPhone(phoneValue) === false) {
            showError(phoneInput, phoneError, 'Please enter a valid 10-digit phone number.');
            isValid = false;
        }

        // Department check
        if (departmentInput.value === '') {
            showError(departmentInput, departmentError, 'Please select your department.');
            isValid = false;
        }

        // Event check
        if (eventInput.value === '') {
            showError(eventInput, eventError, 'Please select an event.');
            isValid = false;
        }

        // If everything is valid, show success message and reset form
        if (isValid === true) {
            successMsg.classList.add('show');
            registerForm.reset();
        }
    });

    function showError(input, errorSpan, message) {
        input.classList.add('invalid');
        errorSpan.textContent = message;
    }

    function clearError(input, errorSpan) {
        input.classList.remove('invalid');
        errorSpan.textContent = '';
    }

    function isValidEmail(value) {
        // Simple check: something@something.something
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value);
    }

    function isValidPhone(value) {
        // Simple check: exactly 10 digits
        var pattern = /^[0-9]{10}$/;
        return pattern.test(value);
    }
}