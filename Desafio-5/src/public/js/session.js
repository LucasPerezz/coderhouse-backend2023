const elementExits = (id) => document.getElementById(id) !== null;

elementExits("login") && document.getElementById("login").addEventListener("click", (e) => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch("http://localhost:8080/sessions/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.msg === "success") {
            window.location.href = `http://localhost:8080/products/`;
        } else {
            window.location.href = "http://localhost:8080/sessions/faillogin"
        }
    })
    .catch(err => console.log(err))

})

elementExits("signup") && document.getElementById("signup").addEventListener("click", (e) => {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    
    if(!first_name || !last_name || !email || !password || !age) {
        alert("Todos los campos son obligatorios")
    } else {
        const data = {first_name, last_name, email, password, age}
        fetch("http://localhost:8080/sessions/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg === "success") {
                window.location.href = "http://localhost:8080/sessions/login"
            } else {
                window.location.href = "http://localhost:8080/sessions/failsignup"
            }
        })
        .catch(err => console.log(err)) 

    }
})

