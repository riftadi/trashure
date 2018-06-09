import requests
import json

# hostname_port = "54.171.75.154:5112"
hostname_port = "localhost:5000"

# add areas
print("Adding areas..")
url = 'http://%s/api/game/area' % hostname_port
headers = {'Content-type': 'application/json'}

# this one is used for our evalution
data = {"name": "Rembrandt Square",
            "latitudeStart": 52.366392, "longitudeStart": 4.895436,
            "latitudeEnd": 52.365604, "longitudeEnd": 4.897701, 
            "startingPointLatitude": 52.3661846 , "startingPointLongitude": 4.8964819
        }
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)
print(response.json())

data = {"name": "area01",
            "latitudeStart": 52.357571, "longitudeStart": 4.878616,
            "latitudeEnd": 52.383144, "longitudeEnd": 4.92445,
            "startingPointLatitude": 52.357571, "startingPointLongitude": 4.878616
        }
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)
print(response.json())

data = {"name": "nzline",
            "latitudeStart": 52.1, "longitudeStart": 4.8,
            "latitudeEnd": 52.3, "longitudeEnd": 4.9,
            "startingPointLatitude": 52.1, "startingPointLongitude": 4.8
        }
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)
print(response.json())

# add users
print("Adding users..")
url = 'http://%s/api/registration' % hostname_port
headers = {'Content-type': 'application/json'}

data = {"username":"user01","password":"123"}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)
print(response.json())

user01_access_token = response.json()["access_token"]
print("user1 access token : %s" % user01_access_token)

data = {"username":"user02","password":"123"}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)
print(response.json())

user02_access_token = response.json()["access_token"]
print("user2 access token : %s" % user02_access_token)

# start game
print("Starting a game..")
url = 'http://%s/api/game/start' % hostname_port
headers = {'Authorization': 'Bearer %s' % user01_access_token}

response = requests.get(url, headers=headers)
print(response.json())

# end game
print("Ending a game..")
url = 'http://%s/api/game/end' % hostname_port
headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % user01_access_token}

data = {"id":1,"score":500}
data_json = json.dumps(data)
response = requests.post(url, data=data_json, headers=headers)
print(response.json())

# see the current leaderboard
print("Requesting leaderboard..")
url = 'http://%s/api/scores/highscores' % hostname_port
response = requests.get(url)
print(response.json())

# add trashbin images
print("Adding a trashbin image..")
url = 'http://%s/api/game/trashbin' % hostname_port
headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % user01_access_token}

data = {"pano": "qWjshdjjrowodd", "latitude": 52.357571, "longitude": 4.878616, "fov": 90, "heading": 235, "pitch": 10}
data_json = json.dumps(data)
#response = requests.post(url, data=data_json, headers=headers)
# print(response.json())

# see all trophies
print("Requesting trophies..")
url = 'http://%s/api/scores/trophies' % hostname_port
headers = {'Authorization': 'Bearer %s' % user01_access_token}
response = requests.get(url, headers=headers)
print(response.json())
