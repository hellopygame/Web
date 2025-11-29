window.onload = () => {

    const square = document.querySelectorAll(".s");
    square.forEach(element => {
        element.addEventListener("click", () => {
            window.location.href = `/topping/${element.querySelector(".name").innerHTML}`;
        });
    });

    

    (document.querySelector("#admin")).addEventListener("click", async () => {

        window.location.href = "/login/Admin"

    });
    document.querySelector("#order").addEventListener("click", () => {
        window.location.href = "/login/Order";
    })

}



