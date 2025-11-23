from flask import Flask, request, jsonify, render_template
import json


app = Flask(__name__)
data = {
}


@app.route('/')
def hello():
    return render_template("index.html") 



@app.route("/sendData")
def sendData():
    new_string = ""
    for key in data:
        new_string += f"{key} : {data[key]}\n"
    
    return new_string
    

@app.route("/saveData", methods= ["POST"])
def saveData():
   
    new_data = request.json
    data[next(iter(new_data))] = sum([int(x) for x in new_data[next(iter(new_data))]])

    return "Save successful"


