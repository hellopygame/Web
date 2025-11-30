from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

data = {
    "order" : 0,
    "remove" : 0
}

request_remove = []

price = {
    "name1": 40,
    "name2": 40, 
    "name3": 40,
    "name4": 40,
    "name5": 40,
    "name6": 40,
    "name7": 10,
    "name8": 5,
    "name9": 5,
    "name10": 5
}

password = {
    "drink": "password",
    "Admin": "operator"
}


@app.route('/')
def hello():
    return render_template("login.html", destination="drink") 

@app.route("/Order")
def order():
    return render_template("order.html")

@app.route("/Admin")
def admin():
    return render_template("admin.html")

@app.route("/drink")
def drink():
    return render_template("drink.html")



@app.route("/login/<topage>")
def login(topage):
    return render_template("login.html", destination= topage)

@app.route("/topping/<name>")
def topping(name):
    return render_template("topping.html", product= name)

@app.route("/checkPassword", methods=["POST"])
def check():
    check = request.json

    if check["pass"] == password[check["destination"]]:
        return {"status": True}
    
    return {"status": False}

@app.route("/sendData")
def sendData():


    new_string = ""
    for key in data:
        new_string += f"{key} : {data[key]}\n"
    
    return new_string
    
@app.route("/getOrder")
def sendOrder():
       
    send_info = [data[orders] for orders in data if orders.isdigit() and not data[orders]["status"]]
    
    return jsonify({"order": send_info})

@app.route("/getAdminLog")
def adminLog():
    send_info = list(data.values())[2:]

    return jsonify({"log": send_info})

@app.route("/getAdminRequest")
def adminRequest():
    
    send_info = [data[orderID] for orderID in request_remove]
    

    return jsonify({"request": send_info})



@app.route("/completeOrder", methods=["POST"])
def completeOrder():

    complete_data = request.json
    data[complete_data["order"]]["status"] = True

    if complete_data["order"] in request_remove:
        request_remove.remove(complete_data["order"])

    return "Order completed!"

@app.route("/sendDelRequest", methods=["POST"])
def addRequest():
    
    deleted_request = request.json
    if deleted_request["request"] in request_remove:
        return "Already requested. Please wait for approval."
    
    request_remove.append(deleted_request["request"])
    return "Request sent successfully."

@app.route("/comfireDelete", methods=["POST"])
def delete():

    delete_order = request.json["request"]
    request_remove.remove(delete_order)
    del data[delete_order]
    data["remove"] += 1
    return "Delete order successfully."

@app.route("/denialRequest", methods=["POST"])
def denialRequest():

    denial_request = request.json["request"]
    request_remove.remove(denial_request)

    return "Denial request successfully."



@app.route("/saveData", methods= ["POST"])
def saveData():
    
    new_data = request.json
    string = ""
    new_data["name"] = new_data["name"].replace(" ", "")
    total = price[new_data["name"]]
    for top in new_data["topping"]:
        if string == "":
            string += top
        else:
            string += f"+{top}"
        
        total += price[top]
        
    if string == "":
        string = f"{new_data["name"]}"
    else:
        string = f"{new_data["name"]} ({string})"
    

    data["order"] += 1

    dic = {
        'ID': str(data["order"]),
        'time': new_data["time"],
        "order": string,
        "total": total,
        "status" : False
    }
    data[str(data["order"])] = dic
    return "order saved"


