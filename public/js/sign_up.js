const givenPassword = document.getElementById("password");
const cnfPassword = document.getElementById("cnf_password");
var id = document.getElementById("user_id");
const button = document.getElementById("sign_up");
// const position = document.getElementById("rank");
const validate2 = document.getElementById("userIdStatus");
// const validate1 = document.getElementById("rankStatus");
const user_container = document.getElementById("user_id_container");
const rank_container = document.getElementById("rank_container");
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
    if (data.available) { //data.available will be true when the user_id is available in data that is no duplicate user_id.
        validate2.innerHTML = "✔️";
        if (id.value == "") validate2.innerHTML = "";
        validate2.style.color = 'green';
        user_container.style.border = '2px solid rgb(100, 250, 117)';
        user_container.style.boxShadow = '2px 2px 5px rgb(113, 242, 184)';
        if (validate2.innerHTML == "✔️") {
            sign_upButton.addEventListener('mouseover', () => {
                sign_upButton.style.cursor = 'pointer';
            });
            sign_upButton.disabled = false;
        }
    } else {
        validate2.innerHTML = "❌";
        validate2.style.color = 'red';
        user_container.style.borderColor = 'RGB(255, 69, 0)';
        user_container.style.boxShadow = '1px 1px 1px RGBA(255, 69, 0,0.8)';
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
        const formData = new FormData(form);
        // const randomInt =  Math.floor(Math.random() * 100000) + 1;
        // console.log(randomInt);

        fetch('/submit-form', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: JSON.stringify({ user_id: id.value.trim(), password: givenPassword.value.trim() })
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