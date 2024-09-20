window.onload = async function() {

    // Your code here
    const userId = document.getElementById("display_id").textContent;
    const resp = await fetch('/results-aval', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId
        })
    });
    const data = await resp.json();
    // const notice = document.getElementById("notice");
    const result_button = document.getElementById("result_button");
    // notice.innerHTML = "Results are not available now!!!";
    if (data.available) {
        result_button.disabled = false;
        result_button.addEventListener('mouseover', () => {
            result_button.style.cursor = 'pointer';
        });
        const notice = document.getElementById("notice");
        notice.innerHTML = "Results are available check now!!!";
    } else {
        const notice = document.getElementById("notice");
        // const sub = document.getElementById("collages_order");
        notice.innerHTML = "Results are not available now!!!";
        // sub.disabled = false;
    }
};
const collage = document.getElementById("collages_order");
const result_button = document.getElementById("result_button");
const userId = document.getElementById("display_id").textContent;
const logout = document.getElementById("log_out");
logout.addEventListener('click', function() {
    // fetch('/');
    window.location('main');
});
result_button.addEventListener('click', async() => {
    const resp = await fetch('get-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId
        })
    });
    const data = await resp.json();
    const show_result = document.getElementById("show_results");
    if (data.available) {
        const colge = data.colg;
        show_result.innerHTML = colge;
    } else {
        show_result.innerHTML = "error while loading!!";
    }
});
collage.addEventListener('click', () => {
    fetch('/seatallocator', {
        method: 'GET'
    });
    window.location = 'seatallocator';
});