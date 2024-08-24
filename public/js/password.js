const icon = document.getElementById("show-icon");
const pass = document.getElementById("input-password");
icon.addEventListener('mouseover', function() {
    pass.type = text;
});
icon.addEventListener('mouseout', function() {
    pass.type = password;
})