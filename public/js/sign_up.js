const givenPassword = document.getElementById("password");
const cnfPassword = document.getElementById("cnf_password");
var id = document.getElementById("user_id");
const button = document.getElementById("sign_up");

id.addEventListener('input', async function(event) {
    event.preventDefault();
    const userId = id.value;
    const resp = await fetch('/is_unique_userid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
    });

    const data = await resp.json();
    const validate = document.getElementById("user-availability");
    const sign_upButton = document.getElementById("sign_up");
    if (data.available) {
        validate.innerHTML = "user ID available ✅";
        validate.style.color = 'green';
        sign_upButton.addEventListener('mouseover', () => {
            sign_upButton.style.cursor = 'pointer';
        });
        sign_upButton.disabled = false;
    } else {
        validate.innerHTML = "try another user ID ❌";
        validate.style.color = 'red';
        sign_upButton.addEventListener('mouseover', () => {
            sign_upButton.style.cursor = 'not-allowed';
        });
        sign_upButton.disabled = true;
    }
});

button.addEventListener('submit', function(event) {
    event.preventDefault();
    if (givenPassword.value === cnfPassword.value && givenPassword.value !== "") {
        const form = document.getElementById("user_form");
        fetch('/submit-form', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: JSON.stringify(formData)
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