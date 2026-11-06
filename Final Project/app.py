from flask import Flask, render_template, jsonify, request
import random
import datetime

app = Flask(__name__)

# Hardcoded list of quotes
QUOTES = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "If you are working on something exciting, it will keep you motivated. – Steve Jobs",
    "Success is not in what you have, but who you are. – Bo Bennett",
    "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama"
]

# In-memory "database" for journal entries
journal_entries = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/quote")
def get_quote():
    quote = random.choice(QUOTES)
    return jsonify({"quote": quote})

@app.route("/journal", methods=["GET", "POST"])
def journal():
    if request.method == "POST":
        data = request.get_json()
        entry = {
            "text": data.get("text", ""),
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        journal_entries.append(entry)
        return jsonify({"success": True, "entry": entry})
    else:
        return jsonify(journal_entries)

if __name__ == "__main__":
    app.run(debug=True)
