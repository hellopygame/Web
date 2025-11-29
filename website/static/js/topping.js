window.onload = () => {

    const name = document.querySelector("#productName").innerHTML

    document.querySelectorAll(".s").forEach(element =>{
        element.addEventListener("click", ()=>{
            if (element.classList.contains("square1")){
                element.classList.replace("square1", "square2");
            }else if (element.classList.contains("square2")){
                element.classList.replace("square2", "square1");
            }
        });

    } );

    document.querySelector("#comfireOrder").addEventListener("click", async () => {
        let toppingArray = []
        if (confirm("Are you sure?")){
            document.querySelectorAll(".square2").forEach(element =>{
                toppingArray.push(element.querySelector(".name").innerHTML)
            })
        }else{
            return
        }
        const currentDate = new Date();
       
        const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        let newjson = {};
        newjson["name"] = name;
        newjson["topping"] = toppingArray;
        newjson["time"] = currentTime
        
        const response = await fetch('/saveData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newjson)
        });
        const txt = await response.text();
        alert(txt);
        window.location.href = "/drink";

    });

    document.querySelector("#cancel").addEventListener("click", ()=>{
        window.location.href = "/drink";
    });
    
    
}