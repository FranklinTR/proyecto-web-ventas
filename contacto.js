
document.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log(JSON.stringify({
        name: e.target.nombre.value,
        email: e.target.email.value,
        message: e.target.mensaje.value,

    }));

    const $loader = document.querySelector(".content-loader");
    $loader.classList.toggle("is-loading");

    fetch("https://formsubmit.co/ajax/"+ e.target.email.value,{
        method: "POST",
        body: JSON.stringify({
            name: e.target.nombre.value,
            email: e.target.email.value,
            message: e.target.mensaje.value,

        }),
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then( response => {if(response.ok) return response.json()})
    .then(data =>{ 
        console.log(data);
        $loader.classList.toggle("is-loading");
        alert("Mensaje enviado correctamente");
    })
    .catch(err => console.log(err))
    .finally(()=> e.target.reset());

});

/*
fetch("https://formsubmit.co/ajax/"+ e.target.email,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then( response => {if(response.ok) return response.json()})
    .then(data => console.log(data))
    .catch(err => console.log(err)); */