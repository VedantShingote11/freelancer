
let profile = document.querySelector(".profile")
let viewProfile = document.querySelector(".viewProfile")
let clicked = false;

profile.addEventListener("click", () => {
    if (clicked) {
        viewProfile.style.opacity = 0;
        viewProfile.style.visibility = "hidden";
        clicked = false;
    } else {
        viewProfile.style.opacity = 1;
        viewProfile.style.visibility = "visible";
        clicked = true;
    }
});