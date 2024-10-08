let timer; // Declare the timer globally to clear it when countdown ends.
const countdownDuration = 1 * 60 * 1000;
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener('click', async function() {
    console.log("Submit button clicked!");

    // Fetch data from the server
    try {
        const resp = await fetch('/main-cal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            console.error("Error in fetching data:", resp.statusText);
            return;
        }

        const data_info = await resp.json(); // Parse JSON response
        const data = data_info.information;
        const vacancy_info = data_info.vacancy;
        var dup = vacancy_info[0]; // this is for reference to vancancies available in the collages specified.
        const userList = document.getElementById("userList");
        userList.innerHTML = '';
        /* vacancy_info.forEach(vacancy => {
             const collages_info_div = document.createElement('div');
             const collageHead = document.createElement('h3');
             collageHead.textContent = `collage_1: ${vacancy.collage_1}, collage_2: ${vacancy.collage_2}, collage_3: ${vacancy.collage_3}, collage_4: ${vacancy.collage_4}, collage_5: ${vacancy.collage_5}`;
             collages_info_div.appendChild(collageHead);
             userList.appendChild(collages_info_div);
         });*/
        data.forEach(user => {
            if (user.collages_order && user.collages_order.length > 0) {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user');
                let colgs = user.collages_order;
                // Loop through the array and convert the names
                //here error is value differe btween Collage 1 and collage_1.
                let converted_Colleges = colgs.map(college => {
                    let number = college.split(' ')[1]; // Extract the number
                    return `collage_${number}`; // Return the new format
                });
                let assign = "";
                for (let i = 0; i < converted_Colleges.length; i++) {
                    let name = converted_Colleges[i];
                    if (dup[name] > 0) {
                        assign = name;
                        dup[name] = dup[name] - 1;
                        break;
                    }
                }
                // Add user ID and rank
                const userHeader = document.createElement('h3');

                userHeader.textContent = `User ID: ${user.user_id}, Rank: ${user.rank}, assigned_collage: ${assign}`;
                userDiv.appendChild(userHeader);
                userList.appendChild(userDiv);
                fetch('/results-upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user.user_id,
                        result: assign
                    })
                });
            }
        });
        const collages_info_div = document.createElement('div');
        const collageHead = document.createElement('h3');
        collageHead.textContent = `collage_1: ${dup.collage_1}, collage_2: ${dup.collage_2}, collage_3: ${dup.collage_3}, collage_4: ${dup.collage_4}, collage_5: ${dup.collage_5}`;
        collages_info_div.appendChild(collageHead);
        userList.appendChild(collages_info_div);
        fetch('/update-vacancies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_vacancy: dup
            })
        });
        /*data.forEach(user => {
            // Create a div for each user
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');

            // Add user ID and rank
            const userHeader = document.createElement('h3');
            userHeader.textContent = `User ID: ${user.user_id}, Rank: ${user.rank}`;
            userDiv.appendChild(userHeader);

            // Add user's colleges (if available)
            if (user.collages_order && user.collages_order.length > 0) {
                const collegesList = document.createElement('ul');
                collegesList.classList.add('colleges');
                user.collages_order.forEach(college => {
                    const collegeItem = document.createElement('li');
                    collegeItem.textContent = college;
                    collegesList.appendChild(collegeItem);
                });
                userDiv.appendChild(collegesList);
            } else {
                // Handle case where no colleges are available
                const noColleges = document.createElement('p');
                noColleges.textContent = 'No colleges available';
                userDiv.appendChild(noColleges);
            }

            // Append user div to the main user list container
            userList.appendChild(userDiv);
        });*/

    } catch (err) {
        console.error("Error occurred during fetch:", err);
    }
});

// Countdown and enabling the submit button
function calculateRemainingTime(endTime) {
    const now = new Date().getTime();
    return endTime - now;
}

function updateCountdown() {
    const endTime = localStorage.getItem('countdownEndTime');
    if (endTime) {
        const remainingTime = calculateRemainingTime(endTime);

        if (remainingTime > 0) {
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            document.getElementById("countdown").textContent = `Time left: ${minutes}m ${seconds}s`;
        } else {
            // When countdown ends, enable the submit button
            const submitBtn = document.getElementById("submitBtn");
            submitBtn.disabled = false;
            submitBtn.classList.add("enabled");
            submitBtn.textContent = "Submit (Enabled)";
            clearInterval(timer); // Clear the interval once the countdown finishes
        }
    }
}

function startCountdown() {
    // 1 minute

    // Clear any previous countdown
    localStorage.removeItem('countdownEndTime');

    let endTime = localStorage.getItem('countdownEndTime');
    if (!endTime) {
        const now = new Date().getTime();
        endTime = now + countdownDuration;
        localStorage.setItem('countdownEndTime', endTime);
    }

    updateCountdown();
    timer = setInterval(updateCountdown, 1000); // Start updating countdown every second
}

window.onload = startCountdown; // Start countdown on page load