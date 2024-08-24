const givenPassword = document.getElementById("password");
const cnfPassword = document.getElementById("cnf_password");
const button = document.getElementById("sign_up");

button.addEventListener('click', function() {
    if (givenPassword.value === cnfPassword.value && givenPassword.value !== "") {
        const form = document.getElementById("user_form");

        const userData = [
            form.querySelector('.user_id').value,
            form.querySelector('.first_name').value,
            form.querySelector('.last_name').value,
            form.querySelector('.create_password').value,
            form.querySelector('.rank').value,
            form.querySelector('.email').value,
            form.querySelector('.phone_no').value
        ];

        const csvData = userData.join(',');

        // Retrieve existing data from localStorage
        let storedData = localStorage.getItem('user_info');
        if (storedData) {
            storedData += '\n' + csvData;
        } else {
            // Add header and first row if this is the first entry
            storedData = 'user_id,first_name,second_name,password,rank,email,phone_no\n' + csvData;
        }

        // Save the updated data back to localStorage
        localStorage.setItem('user_info', storedData);

        // Redirect to the main page
        window.location.href = 'main.html';
    } else {
        const alert = document.getElementById("alert");
        alert.innerHTML = "Password doesn't match! Try again.";
    }
});