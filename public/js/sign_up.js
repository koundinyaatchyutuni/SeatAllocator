const givenPassword = document.getElementById("password");
const cnfPassword = document.getElementById("cnf_password");
var id = document.getElementById("user_id");
const button = document.getElementById("sign_up");
const position = document.getElementById("rank");
const validate1 = document.getElementById("rank-availability");
const validate2 = document.getElementById("user-availability");
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

    const sign_upButton = document.getElementById("sign_up");
    if (data.available) {
        validate2.innerHTML = "user ID available ✅";
        validate2.style.color = 'green';
        if (validate1.innerHTML == "rank is  valied✅") {
            sign_upButton.addEventListener('mouseover', () => {
                sign_upButton.style.cursor = 'pointer';
            });
            sign_upButton.disabled = false;
        }
    } else {
        validate2.innerHTML = "try another user ID ❌";
        validate2.style.color = 'red';
        sign_upButton.addEventListener('mouseover', () => {
            sign_upButton.style.cursor = 'not-allowed';
        });
        sign_upButton.disabled = true;
    }
});
position.addEventListener('input', async function(event) {
    event.preventDefault();
    const rank = position.value;
    const resp = await fetch('/is_unique_rank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rank: rank })
    });
    const data = await resp.json();

    const sign_upButton = document.getElementById("sign_up");
    if (data.available) {
        validate1.innerHTML = "rank is  valied✅";
        validate1.style.color = 'green';
        if (validate2.innerHTML == "user ID available ✅") {
            sign_upButton.addEventListener('mouseover', () => {
                sign_upButton.style.cursor = 'pointer';
            });
            sign_upButton.disabled = false;
        }
    } else {
        validate1.innerHTML = "rank is invalied❌";
        validate1.style.color = 'red';
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