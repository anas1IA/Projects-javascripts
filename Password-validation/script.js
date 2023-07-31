const password = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");
const requirements = [
    { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
    { regex: /[0-9]/, index: 1 }, // At least one number
    { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
    { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
];

password.addEventListener("keyup", (e) => {
    requirements.forEach((item) => {
        // Check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];
        if (isValid) {
            requirementItem.firstElementChild.className = "fa-solid fa-check";
            requirementItem.classList.add("valid")
        } else {
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
            requirementItem.classList.remove("valid")
        }
    });
});

function exe() {
    // Toggle the password input between "passwor xd" and "text"
    password.type = password.type === "password" ? "text" : "password";
    // Update the eye icon class based on the password input type
    eyeIcon.className = `fa-solid fa-eye${password.type === "password" ? "" : "-slash"}`;
}
eyeIcon.addEventListener("click", exe);