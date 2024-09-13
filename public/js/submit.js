const countdownDuration = 1 * 60 * 1000;

function calculateRemainingTime(endTime) {
    const now = new Date().getTime();
    return endTime - now;
}

const cal = document.getElementById("submitBtn");
console.log("outside the function!!!");
cal.addEventListener('click', async function() {
    console.log("Submit button clicked!");

    // Fetch data from the server
    const resp = await fetch('/main-cal', {
        method: 'POST', // Can be 'GET' if there's no data to send
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (resp.ok) {
        const data_info = await resp.json(); // Parse JSON response
        const data = data_info.information;
        console.log("Fetched data:", data); // Log the fetched data

        // Proceed to manipulate or display the data
        let userList = [];
        for (let i = 0; i < data.length; i++) {
            let userJson = {
                userId: data[i].user_id,
                userColleges: data[i].collages_order // Ensure correct field name
            };
            userList.push(userJson);
        }

        console.log("User List:", userList); // Log the user list

    } else {
        console.error("Failed to fetch data:", resp.statusText);
    }
});

// Function to update the countdown display
function updateCountdown() {
    const endTime = localStorage.getItem('countdownEndTime');
    if (endTime) {
        const remainingTime = calculateRemainingTime(endTime);

        if (remainingTime > 0) {
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            document.getElementById("countdown").textContent =
                `Time left: ${minutes}m ${seconds}s`;
        } else {
            // When countdown ends, enable the submit button
            let submitBtn = document.getElementById("submitBtn");
            submitBtn.disabled = false;
            submitBtn.classList.add("enabled");
            submitBtn.textContent = "Submit (Enabled)";
            clearInterval(timer);
        }
    }
}

// Start the countdown or get existing countdown state
function startCountdown() {
    // Clear any previously stored countdown from localStorage
    localStorage.removeItem('countdownEndTime');

    let endTime = localStorage.getItem('countdownEndTime');

    if (!endTime) {
        // If no previous countdown exists, create one
        const now = new Date().getTime();
        endTime = now + countdownDuration;
        localStorage.setItem('countdownEndTime', endTime);
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}

// Start the countdown on page load
window.onload = startCountdown;