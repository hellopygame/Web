window.onload = () =>{
    document.querySelector("#passwordOK").addEventListener("click", async() =>{
        const destination = document.querySelector("#destination").innerHTML

        const response = await fetch("/checkPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "destination" : destination,
                "pass" : document.querySelector(".password").value
            })
        });
        const status = await response.json();
        if (status["status"]){
            window.location.href = `/${destination}`;
        }else{
            alert(`Password incorret for ${destination}`);
        }
    });

    document.querySelector("#Cancel").addEventListener("click", ()=>{
        window.location.href = "/drink"
    });
}