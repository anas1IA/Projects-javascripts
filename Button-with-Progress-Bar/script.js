const button = document.querySelector(".button");
const text = document.querySelector(".text");

button.addEventListener("click", () => {
    button.classList.add("progress");
    text.innerText = "Uploading..."
    setTimeout(() => {
        button.classList.remove("progress");
        text.innerText = "Upload your file"
    }, 6000);

});