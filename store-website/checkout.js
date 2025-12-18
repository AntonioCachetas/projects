document.getElementById("checkout-form").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    if(name === "" || address === "" || email === ""){
        alert("Please fill all fields.");
        return;
    }

    // Simple email regex check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!emailPattern.test(email)){
        alert("Please enter a valid email.");
        return;
    }

    // Clear the cart
    localStorage.removeItem("cart");

    alert(`Thank you for your purchase, ${name}! Your order will be shipped to ${address}.`);

    // Redirect to home
    window.location.href = "index.html";
});
