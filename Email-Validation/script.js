const emailInput = document.querySelector(".input-field input");
const envelope = document.querySelector(".uil.uil-envelope-alt");

emailInput.addEventListener("keyup", () => {
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

    if (emailInput.value === "") {
        return console.log("Input is empty");
    }

    if (emailInput.value.match(emailPattern)) {
        envelope.classList.replace("uil-envelope-alt", "uil-check");
        return envelope.style.color = "#6842f4";


    } else {
        envelope.classList.replace("uil-check", "uil-envelope-alt");
        return envelope.style.color = "#f44242";
    }
});