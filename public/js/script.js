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

// Toggle song display on student profile

const songList = document.getElementById('song-container');
const songTag = document.getElementById('song-tag');
songTag.onclick = function (event) {
    if (songList.style.display === "none") {
        songList.style.display = "grid";
    } else {
        songList.style.display = "none";
    }
}
