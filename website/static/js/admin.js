window.onload = () =>{
    const adminOrder = document.querySelector("#orderLog");
    const adminRequest = document.querySelector("#requestLog");
    adminRequest.classList.add("hidden");
    
    document.querySelector("#requestRemove").addEventListener("click", async()=>{
        if (adminRequest.classList.contains("hidden")){
            adminRequest.classList.remove("hidden");
            adminOrder.classList.add("hidden");
        }else{
            adminOrder.classList.remove("hidden");
            adminRequest.classList.add("hidden");
            return
        }
        refreshRequest()



    });


    document.querySelector("#back").addEventListener("click", () => {
        window.location.href = "/drink"
    });
    
    refresh();
}

function refresh(){

    getLog();
    let count = 10;
    const interval = setInterval(() =>{
        count--;
        const countdown = document.querySelector("#adminRefresh")
        countdown.innerHTML = ""
        const new_text = document.createElement("p")
        new_text.textContent = `refresh in 00:0${count}...`
        countdown.appendChild(new_text)
        if (count == 0){
            
            clearInterval(interval)
            refresh()
        }

    }, 1000);
}

async function getLog(){
    const log = document.querySelector("#adminLog")
    log.innerHTML = ""

    const response = await fetch("/getAdminLog")
    const orderLog = await response.json()
    if (orderLog["log"] == undefined){
        return
    }
    
    
    orderLog["log"].forEach(element => {
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

        const orderStatus = document.createElement("p");
        orderStatus.classList.add("orderStatus");
        
        if (element["status"]){
            orderStatus.classList.add("complete");
        }else{
            orderStatus.classList.add("incomplete")
        }
        orderStatus.textContent = `Complete status: ${element["status"]}`
        buttonFrame.appendChild(orderStatus)


        orderFrame.appendChild(buttonFrame);
        log.appendChild(orderFrame);
        
    });
    

}

function refreshRequest(){
    getRequestLog();
    let count = 10;
    const interval = setInterval(() =>{
        count--;
        const countdown = document.querySelector("#requestRefresh")
        countdown.innerHTML = ""
        const new_text = document.createElement("p")
        new_text.textContent = `refresh in 00:0${count}...`
        countdown.appendChild(new_text)
        if (count == 0){
            
            clearInterval(interval)
            refreshRequest()
        }

    }, 1000);
}

async function getRequestLog(){
    const log = document.querySelector("#request")
    log.innerHTML = ""

    const response = await fetch("/getAdminRequest")
    const orderLog = await response.json()
    
    if (orderLog["request"] == undefined){
        return
    }

    orderLog["request"].forEach(element => {
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
        
        const confirmDel = document.createElement("button");
        confirmDel.textContent = "Delete"
        confirmDel.addEventListener("click", async() => {
            const response = await fetch("/comfireDelete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"request" : element["ID"]})
            })
            const response_text = await response.text();
            alert(response_text);
            console.log(response_text);
            getRequestLog()
        });
        buttonFrame.appendChild(confirmDel);
        
        const denialButton = document.createElement("button");
        denialButton.textContent = "Denial";
        denialButton.addEventListener("click", async() => {
            const response = await fetch("/denialRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"request": element["ID"]})
            });
            const res = await response.text();
            alert(res)
            console.log(res)
            getRequestLog()
        });
        buttonFrame.appendChild(denialButton);
        


        orderFrame.appendChild(buttonFrame);
        log.appendChild(orderFrame);
        
    });
    

}
