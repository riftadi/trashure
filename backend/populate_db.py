import requests
import json

# add areas
url = 'http://localhost:5000/api/game/area'
headers = {'Content-type': 'application/json'}

# this one is used for our evalution
data = {"name": "Rembrandt Square", "latitudeStart": 52.366392, "longitudeStart": 4.895436, "latitudeEnd": 52.365604, "longitudeEnd": 4.897701}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

data = {"name": "area01", "latitudeStart": 52.357571, "longitudeStart": 4.878616, "latitudeEnd": 52.383144, "longitudeEnd": 4.92445}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

data = {"name": "nzline", "latitudeStart": 52.1, "longitudeStart": 4.8, "latitudeEnd": 52.3, "longitudeEnd": 4.9}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

# add users
url = 'http://localhost:5000/api/registration'
headers = {'Content-type': 'application/json'}

data = {"username":"user01","password":"123"}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

user01_access_token = response.json()["access_token"]

data = {"username":"user02","password":"123"}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

user02_access_token = response.json()["access_token"]

# start game
url = 'http://localhost:5000/api/game/start'
headers = {'Authorization': 'Bearer %s' % user01_access_token}

response = requests.get(url, headers=headers)

# end game
url = 'http://localhost:5000/api/game/end'
headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % user01_access_token}

data = {"id":1,"score":500}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

# see the current leaderboard
url = 'http://localhost:5000/api/scores/highscores'
response = requests.get(url)

# add trashbin images
url = 'http://localhost:5000/api/game/trashbin'
headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % user01_access_token}

data = {"pano": "qWjshdjjrowodd", "latitude": 52.357571, "longitude": 4.878616, "fov": 90, "heading": 235, "pitch": 10}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

# see all trophies
url = 'http://localhost:5000/api/scores/trophies'
response = requests.get(url)
