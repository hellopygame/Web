window.onload = () =>{
    document.querySelector("#back").addEventListener("click", ()=>{
        window.location.href = "/drink";
    });


    countTime();
    
}

function countTime(){
    getOrder();
    let count = 10;
    const interval = setInterval(() =>{
        count--;
        const countdown = document.querySelector("#orderCount")
        countdown.innerHTML = ""
        const new_text = document.createElement("p")
        new_text.textContent = `refresh in 00:0${count}...`
        countdown.appendChild(new_text)
        if (count == 0){
            
            clearInterval(interval)
            countTime()
        }

    }, 1000);
}

async function getOrder(){
    const log = document.querySelector("#orderLog")
    log.innerHTML = ""

    const response = await fetch("/getOrder")
    const incomplete = await response.json()
    
    
    incomplete["order"].forEach(element => {
        const orderFrame = document.createElement("div");
        orderFrame.classList.add("orderFrame");
        
        const orderID = document.createElement("h1");
        orderID.textContent = `Order ID: ${element["ID"]}`;
        orderID.classList.add("orderID");
        orderFrame.appendChild(orderID);

        const orderInfo = document.createElement("p");
        orderInfo.textContent = `Order: ${element["order"]}`;
        orderInfo.classList.add("orderInfo");
        orderFrame.appendChild(orderInfo);
        
        const orderTime = document.createElement("p");
        orderTime.textContent = element["time"];
        orderTime.classList.add("orderTime");
        orderFrame.appendChild(orderTime);

        const buttonFrame = document.createElement("div");
        buttonFrame.classList.add("orderButtonFrame");

        const request_del = document.createElement("button");
        request_del.textContent = "Delete"
        request_del.addEventListener("click", async() => {
            const response = await fetch("/sendDelRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"request" : element["ID"]})
            })
            const response_text = await response.text();
            alert(response_text);
            console.log(response_text);
        });
        buttonFrame.appendChild(request_del);
        
        const doneButton = document.createElement("button");
        doneButton.textContent = "Done";
        doneButton.addEventListener("click", async() => {
            const response = await fetch("/completeOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"order": element["ID"]})
            });
            const res = await response.text();
            alert(res)
            console.log(res)
            getOrder()
        });
        buttonFrame.appendChild(doneButton);


        orderFrame.appendChild(buttonFrame);
        log.appendChild(orderFrame);
        
    });
    

}