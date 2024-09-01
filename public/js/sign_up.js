const givenPassword = document.getElementById("password");
const cnfPassword = document.getElementById("cnf_password");
const button = document.getElementById("sign_up");

button.addEventListener('submit', function(event) {
    event.preventDefault();
    if (givenPassword.value === cnfPassword.value && givenPassword.value !== "") {
        const form = document.getElementById("user_form");
        fetch('/submit-form', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                alert('data is transmitted!');
                // Handle successful response
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    } else {
        const alert = document.getElementById("alert");
        alert.innerHTML = "Password doesn't match! Try again.";
        return;
    }
});