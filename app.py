import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo

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
        "maxResults": 5  
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

@app.route("/player_stats")
def player_stats():
    player_name = request.args.get("player", "")

    player_list = players.find_players_by_full_name(player_name)
    if not player_list:
        return jsonify({"error": "Player not found"}), 404
    player_id = player_list[0]['id']

    career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
    stats = career_stats.get_data_frames()[0].to_dict(orient='records')
    return jsonify(stats)

@app.route("/player_bio")
def player_bio():
    player_name = request.args.get("player", "")
    player_list = players.find_players_by_full_name(player_name)
    if not player_list:
        return jsonify({"error": "Player not found"}), 404
    player_id = player_list[0]['id']
    info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    bio = info.get_data_frames()[0].to_dict(orient="records")[0]
    return jsonify(bio)


if __name__ == "__main__":
    app.run(port=8000, debug=True)

