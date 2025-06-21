import pandas as pd 
import numpy as np
import tensorflow as tf
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, commonplayerinfo

# this loads my data
df = pd.read_csv('nba_player_seasons.csv') 


features = ['AGE', 'GP', 'GS', ]