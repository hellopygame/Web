window.onload = () => {
    const square = document.querySelectorAll(".s");
    square.forEach(element => {
        clickSquare(element);
    });

    // const b2 = document.querySelector("#b2");
    // b2.addEventListener("click", async () => {
    //     const response = await fetch('/test');
    //     const json = await response.json();
    //     const user = json.data;
    //     console.log(json);
    // });

    (document.querySelector("#b1")).addEventListener("click", async () => {
        let amountArray = []
        if (confirm("Are you sure?")) {
            const square2 = document.querySelectorAll(".square2")
            square2.forEach(element => {
                amountArray.push((element.querySelector(".price")).innerHTML)
                element.classList.replace("square2", "square1")
            })
        }else{
            return
        }
        let now = new Date()
        let newjson = {}
        newjson[now.toString()] = amountArray

        const response = await fetch('/saveData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newjson)
        });
        const txt = await response.text();
        alert(txt);
        console.log(txt);
        
    });

    (document.querySelector("#b2")).addEventListener("click", async () => {

        const response = await fetch('/sendData');
        const text = await response.text();
        alert(text);
        console.log(text);
        
    });

    // (document.querySelector("#b4")).addEventListener("click", async () => {
    //     const response = await fetch('/test3', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             "data": "hi"
    //         })
    //     });
    //     const jsn = await response.json();
    //     console.log(jsn);

    // });


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

