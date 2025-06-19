import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.static import players
import random

load_dotenv()
API_KEY = os.getenv("YOUTUBE_API_KEY")

app = Flask(__name__)
CORS(app)  

def search_highlight(player: str):
    prompt = f"{player} basketball highlights edits"
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": prompt,
        "type": "video",
        "key": API_KEY,
        "maxResults": 10  
    }

    res = requests.get(url, params=params)
    data = res.json()
    items = data.get("items", [])
    if not items:
        return {"video_url": None}
    
    video = random.choice(items)
    video_id = video["id"]["videoId"]
    return {"video_url": f"https://www.youtube.com/embed/{video_id}"}

@app.route("/search")
def search():
    player = request.args.get("player", "")
    result = search_highlight(player)
    return jsonify(result)

@app.route("/players")
def get_players():
    all_players = players.get_players()
    player_names = [p['full_name'] for p in all_players]
    return jsonify(player_names)

if __name__ == "__main__":
    app.run(port=8000, debug=True)

