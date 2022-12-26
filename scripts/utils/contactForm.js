function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'true')
    // document.body.style.overflow = "hidden"
    // document.body.style.height = "100%"

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    // document.body.style.overflow = "auto"
    // document.body.style.height = "auto"
}



let form = document.getElementById('form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;

    console.log("Prénom: " + fname, "Nom: " + lname, "email: " + email)
})