window.onload = () => {
    const square = document.querySelectorAll(".s");
    square.forEach(element => {
        clickSquare(element);
    });

    const b2 = document.querySelector("#b2");
    b2.addEventListener("click", async () => {
        const response = await fetch('/test');
        const json = await response.json();
        const user = json.data;
        console.log(json);
    });

    (document.querySelector("#b3")).addEventListener("click", async () => {
        const response = await fetch('/test2', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "data": "hi"
            })
        });
        const txt = await response.text();
        console.log(txt);

        (document.querySelector("p")).innerHTML = txt;
    });

    (document.querySelector("#b4")).addEventListener("click", async () => {
        const response = await fetch('/test3', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "data": "hi"
            })
        });
        const jsn = await response.json();
        console.log(jsn);

    });


}

function clickSquare(e) {
    e.addEventListener("click", () => {
        const hasClass = e.classList.contains("square1");
        if (hasClass) {
            e.classList.replace("square1", "square2");
        } else {
            e.classList.replace("square2", "square1");
        }
        
    });
}

