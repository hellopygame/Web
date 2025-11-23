from flask import Flask, request, jsonify, render_template
import json


app = Flask(__name__)

data = {

}

@app.route('/')
def hello():
    return render_template("index.html") 



@app.route("/test")
def text():
    return jsonify({
        "data": "hello",
        "data2": 1,
        "data3": None
    })

@app.route("/test2", methods = ["POST"])
def text2():
    data = request.json


    return "My text!!!!" + data["data"]

@app.route("/test3", methods = ["POST"])
def text2():
    data = request.json
    with open("data.json", "w") as f:
        json.dump(data, f, indent= 4)

    return "My text!!!!" + data["data"]

@app.route("/saveData")
def saveData():
    pass



if __name__ == '__main__':
    app.run(debug=True)