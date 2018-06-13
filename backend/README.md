# Backend

## Run Instruction

To run the backend, simply use `python run.py`.

## API specification

Here is the currently implemented API specification for the backend.

### Authentication

The authentication is implemented using [JWT](https://pythonhosted.org/Flask-JWT/).

Steps required to use the API endpoints:
1. Register user
2. If logging back in, login using the registered user's credential
3. Use token in header to authenticate yourself
4. Logout, your token will be revoked

See the example to add users in the section [*Initializing DB*](#dbinit).

#### Register user

POST to **/api/registration** with input of:

`"username":"user01","password":"123"`

You will get the `access_token`, save it for further authentication.

#### Log back in

POST to **/api/login** with input of:

`"username":"user01","password":"123"`

You will get the `access_token`, save it for further authentication.

#### Token usage

Example to start a game:

GET to **/api/game/start** with header of `Authorization: Bearer <access_token>`.

#### Logout

GET to **/api/logout/access** with header of `Authorization: Bearer <access_token>`.

### Game

Endpoints for starting/ending a game.

#### GET /api/game/start
This endpoint will be used to start a new game. For now it will probably be enough to return an area to explore bins in.

Output
```json
{
    id: 0, // Unique identifier for the game
    gamemode: 0 // For now we only have the exploration mode so this will always be the same
    area: { // This will specify the bounding box of the search area
        longitudeStart: 52.357571,
        latitudeStart: 4.878616,
        longitudeEnd: 52.383144,
        latitudeEnd: 4.924450
    }
}
```

#### POST /api/game/end

Input
```
{
    id: 0, // game id
    score: 500 // it will be really easy to cheat by modifying your score like this, but that is fine for now i suppose
}
```

Output
`200 OK`

#### POST /api/game/trashbin
This endpoint will be used when a user marks a trashbin.

Input
```
{
    pano: 'qWhsj7hsjekslfhsg', // String representing the id of a streetview image
    longitude: 52.357571,
    latitude: 4.878616,
    fov: 90,
    heading: 235,
    pitch: 10
}
```

Output
```
{
    verified: false // When it has been verified before, it returns true and point will be awarde immediately
}
```

### Scores

Endpoint for the point scoring in the game.

#### GET /api/scores/highscores

Output 
```
highscores :
[
    {position: 1, name:"Username", totalScore: 3800},
    {position: 2, name:"Username", totalScore: 2700},
    {position: 3, name:"Username", totalScore: 1650}
]
```

#### GET /api/scores/trophies

Endpoint for the trashbin trophies. Don't forget the `access_token` to identify the user.

Output 
```
trophies :
[
    {pano: 'qWjshdjjrowodd', longitude: 52.357571, latitude: 4.878616, fov: 90, heading: 235, pitch: 10},    
    {pano: 'qWjshdjjrowodd', longitude: 52.357571, latitude: 4.878616, fov: 90, heading: 235, pitch: 10},
    {pano: 'qWjshdjjrowodd', longitude: 52.357571, latitude: 4.878616, fov: 90, heading: 235, pitch: 10}
]
```

## <a name="dbinit"></a>Initializing DB

Before running the game, you should initialize the DB. Pick one of the following approaches.

### Initializing DB using `populate_db.py`

You can initialize an empty db using the provided `populate_db.py` script. Make sure to delete any `app.db` before executing the script.

Alternatively, you can also use curl commands as described in the following subsection.

### Initializing DB using curl commands

You can initialize an empty db using the following curl commands:

```
# add areas
curl -i  -H "Content-Type: application/json" \
  --request POST \
  --data '{"name": "area01", "latitudeStart": 52.357571, "longitudeStart": 4.878616, "latitudeEnd": 52.383144, "longitudeEnd": 4.92445}' \
  http://localhost:5000/api/game/area
curl -i  -H "Content-Type: application/json" \
  --request POST \
  --data '{"name": "nzline", "latitudeStart": 52.1, "longitudeStart": 4.8, "latitudeEnd": 52.3, "longitudeEnd": 4.9}' \
  http://localhost:5000/api/game/area
curl -i http://localhost:5000/api/game/area

# add users
curl -i -H "Content-Type: application/json" \
  --request POST \
  --data '{"username":"user01","password":"123"}' \
  http://localhost:5000/api/registration
curl -i -H "Content-Type: application/json" \
  --request POST \
  --data '{"username":"user02","password":"123"}' \
  http://localhost:5000/api/registration

# start game
curl -i -H "Authorization: Bearer <token>" http://127.0.0.1:5000/api/game/start
# end game
curl -i  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  --request POST \
  --data '{"id":1,"score":500}' \
  http://localhost:5000/api/game/end

# see the current leaderboard
curl -i http://localhost:5000/api/scores/highscores

# add trashbin images
curl -i   -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  --request POST \
  --data '{"pano": "qWjshdjjrowodd", "latitude": 52.357571, "longitude": 4.878616, "fov": 90, "heading": 235, "pitch": 10}' \
  http://localhost:5000/api/game/trashbin

# see all trophies
curl -i -H "Authorization: Bearer <token>" http://localhost:5000/api/scores/trophies

```

## Evaluation Area

For our experiment, we use the Rembrandt Square of Amsterdam.

```json
{
    "area_name" : "Rembrandt Square",
    "topLeft" : {
            "lat" : 52.366392,
            "long" : 4.895436
        },
    "bottomRight" : {
            "lat" : 52.365604,
            "long" : 4.897701
        },
    "n_bins" : 20
}
```

To add the Rembrandt Square area using curl:
```
curl -i  -H "Content-Type: application/json" \
  --request POST \
  --data '{"name": "Rembrandt Square", "latitudeStart": 52.366392, "longitudeStart": 4.895436, "latitudeEnd": 52.365604, "longitudeEnd": 4.897701}' \
  http://localhost:5000/api/game/area
```

