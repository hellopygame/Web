from flask import Flask, request, jsonify, render_template
import json


app = Flask(__name__)



@app.route('/')
def hello():
    return render_template("index.html") 



@app.route("/sendData")
def sendData():
    with open("data.json", "r") as f:
        data = json.load(f)
    
    new_string = ""
    for key in data:
        new_string += f"{key} : {data[key]}\n"
    
    return new_string
    

@app.route("/saveData", methods= ["POST"])
def saveData():
    with open("data.json", "r") as f:
        data = json.load(f)
    new_data = request.json
    data[next(iter(new_data))] = sum([int(x) for x in new_data[next(iter(new_data))]])

    with open("data.json", "w") as f:
        json.dump(data, f, indent= 4)

    return "Save successful"

