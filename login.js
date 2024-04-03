document.addEventListener('DOMContentLoaded', function() {
    let passwordInput = document.querySelector("input[name='password']");
    let showPasswordButton = document.querySelector("#showPasswordButton");

    showPasswordButton.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario

        let email = loginForm.querySelector("input[name='email']").value;
        let password = loginForm.querySelector("input[name='password']").value;

        //USUARIO Y CONTRASEÑA DE MANERA LOCAL 
        ///Verificar usuario y contraseña localmente
        if (email === "juan@example.com" && password === "123456") {
            // Guardar el correo electrónico en localStorage
            localStorage.setItem('userEmail', email);
            // Redirigir al usuario a index.html si las credenciales son correctas
            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});



