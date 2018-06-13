import csv
import math
import urllib.request, json

class Raycast:

    def __init__(self, heading, pitch, norm_screen_x, norm_screen_y, fov, aspect):
        self.heading = heading
        self.pitch = pitch
        self.screen_x = norm_screen_x
        self.screen_y = norm_screen_y
        self.fov = fov
        self.aspect = aspect


    def get_raycast(self):
        return {"pitch": self.pitch + 0.5 * self.screen_y * self.fov / self.aspect, "heading": self.heading + 0.5 * self.screen_x * self.fov}

    def get_distance(self, observer_height):
        theta = self.get_raycast()["pitch"];
        return abs(observer_height/math.tan(theta/180.0*math.pi))

    def get_latlng(self, current_lat, current_lng):
        heading = ((360 - self.get_raycast()["heading"]) + 90)%360;
        distance = self.get_distance(3);
        if (distance is None or distance > 20):
            return None
        x = distance * math.cos(heading/180.0*math.pi);
        y = distance * math.sin(heading/180.0*math.pi);
        return {"lat": current_lat + y/111300.0, "lng": current_lng + x/111300.0/math.cos(current_lat/180.0*math.pi)};



with open('C:/Users/gerarda/Downloads/trashbins.csv') as csvfile:
    trashbins = csv.DictReader(csvfile)
    for row in trashbins:
        streetview_url = "https://maps.googleapis.com/maps/api/streetview/metadata?pano={0}&key=AIzaSyDKv-vShjESv1Hwkn3FCqPUj-Ff7BW17ic".format(
            row["pano"])
        with urllib.request.urlopen("http://maps.googleapis.com/maps/api/geocode/json?address=google") as url:
            data = json.loads(url.read().decode())
            r = Raycast(int(row["heading"]), int(row["pitch"]), 300, 250, int(row["fov"]), 300 / 250)
            location = data["results"][0]["geometry"]["location"]
            print(row)
            print(data)
            print(r.get_latlng(float(location["lat"]), float(location["lng"])))