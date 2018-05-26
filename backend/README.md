# Backend

## API specification

Here is the currently implemented API specification for the backend.

### Authentication

The authentication is implemented using [JWT](https://pythonhosted.org/Flask-JWT/). More details are to be written.
See the example to add users in the section [*Initializing DB using curl commands*](#curlinit).

### Game

Endpoints for starting/ending a game.

#### GET /api/game/start
This endpoint will be used to start a new game. For now it will probably be enough to return an area to explore bins in.

Output
```
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

Endpoint for the trashbin trophies.

Output 
```
trophies :
[
    {pano: 'qWjshdjjrowodd', longitude: 52.357571, latitude: 4.878616, fov: 90, heading: 235, pitch: 10},    
    {pano: 'qWjshdjjrowodd', longitude: 52.357571, latitude: 4.878616, fov: 90, heading: 235, pitch: 10},
    {pano: 'qWjshdjjrowodd', longitude: 52.357571, latitude: 4.878616, fov: 90, heading: 235, pitch: 10}
]
```

## <a name="curlinit"></a>Initializing DB using curl commands

You can initialize an empty db using the following curl commands:

```
# add areas
curl -i  --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "area01", "longitudeStart": 52.357571, "latitudeStart": 4.878616, "longitudeEnd": 52.383144, "latitudeEnd": 4.92445}' \
  http://localhost:5000/api/game/area
curl -i  --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "nzline", "longitudeStart": 52.1, "latitudeStart": 4.8, "longitudeEnd": 52.3, "latitudeEnd": 4.9}' \
  http://localhost:5000/api/game/area
curl -i http://localhost:5000/api/game/area

# add users
curl -i --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"user01","password":"123"}' \
  http://localhost:5000/api/registration
curl -i --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"user02","password":"123"}' \
  http://localhost:5000/api/registration

# start game
curl -i http://127.0.0.1:5000/api/game/start
# end game
curl -i  --header "Content-Type: application/json" \
  --request POST \
  --data '{"id":1,"score":500}' \
  http://localhost:5000/api/game/end

curl -i http://localhost:5000/api/scores/highscores

# add trashbin images
curl -i  --header "Content-Type: application/json" \
  --request POST \
  --data '{"pano": "qWjshdjjrowodd", "longitude": 52.357571, "latitude": 4.878616, "fov": 90, "heading": 235, "pitch": 10}
' \
  http://localhost:5000/api/game/trashbin

curl -i http://localhost:5000/api/scores/trophies
```
