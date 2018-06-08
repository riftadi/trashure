import requests
import json

hostname_port = "%s:5000"

# add areas
url = 'http://%s/api/game/area' % hostname_port
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
url = 'http://%s/api/registration' % hostname_port
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
url = 'http://%s/api/game/start' % hostname_port
headers = {'Authorization': 'Bearer %s' % user01_access_token}

response = requests.get(url, headers=headers)

# end game
url = 'http://%s/api/game/end' % hostname_port
headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % user01_access_token}

data = {"id":1,"score":500}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

# see the current leaderboard
url = 'http://%s/api/scores/highscores' % hostname_port
response = requests.get(url)

# add trashbin images
url = 'http://%s/api/game/trashbin' % hostname_port
headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % user01_access_token}

data = {"pano": "qWjshdjjrowodd", "latitude": 52.357571, "longitude": 4.878616, "fov": 90, "heading": 235, "pitch": 10}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)

# see all trophies
url = 'http://%s/api/scores/trophies' % hostname_port
response = requests.get(url)
