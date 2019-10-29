// Activate login and signup modals on homepage

const loginModal = document.getElementById('login-form');
window.onclick = function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
}

const signupModal = document.getElementById('signup-form');
window.onclick = function (event) {
    if (event.target === signupModal) {
        signupModal.style.display = "none";
    }
}



// Change navbar options when teacher is logged in
