const modal = document.getElementById("contact_modal");
const form = document.getElementById('form');
const close = document.getElementById('closeModal');

function displayModal() {
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'true')
}

function closeModal() {
    modal.style.display = "none";
    close.focus()
}


form.addEventListener('submit', function(event){
    event.preventDefault()
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;

    console.log("Prénom: " + fname, "Nom: " + lname, "email: " + email)
    closeModal()
})