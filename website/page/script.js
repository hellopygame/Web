window.onload = () => {
    const square = document.querySelectorAll(".s");
    square.forEach(element => {
        clickSquare(element);
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
        // alert("r")
    });
}

function buttonPressed() {
    if (confirm("Are you sure?")) {
        const itemarray = [];
        const square2 = document.querySelectorAll(".square2");
        square2.forEach(element => {
            element.classList.replace("square2", "square1");
            const priceEle = element.querySelector(".price")
            itemarray.push(priceEle.innerHTML)
            const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            fetch("https://web-2yhg.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date : itemarray
                })
                
            })
            .then(res => res.json())
            .then(data => {
                new_data = JSON.parse(data);
                const text = document.querySelector("#t1");
                text.textContent = new_data.amount;
            })
        });



    } else {
        return
    }


}


