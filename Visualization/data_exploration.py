import requests
from pprint import pprint
import json
import numpy as np

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

data = requests.get(url)
data = json.loads(data.content)
# pprint(json.loads(data.content))

# feature list under data["features"]
# properties under data["features"][i]["properties"]
# geometry under data["features"][i]["geometry"]
# coordinates under data["features"][i]["geometry"]["coordinates"]

count = 0
lat = 0
lng = 0
for event in data["features"]:
    coordinates = event["geometry"]["coordinates"]
    lat += coordinates[0]
    lng += coordinates[1]
    count += 1

print(lat/count, lng/count)
    


"""
type: "Feature",
properties: {
    mag: 1.35,
    place: "32km SE of Bodfish, CA",
    time: 1554346246330,
    updated: 1554346627376,
    tz: -480,
    url: "https://earthquake.usgs.gov/earthquakes/eventpage/ci37604738",
    detail: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci37604738.geojson",
    felt: 1,
    cdi: 2.2,
    mmi: null,
    alert: null,
    status: "automatic",
    tsunami: 0,
    sig: 28,
    net: "ci",
    code: "37604738",
    ids: ",ci37604738,",
    sources: ",ci,",
    types: ",dyfi,geoserve,nearby-cities,origin,phase-data,",
    nst: 22,
    dmin: 0.1597,
    rms: 0.14,
    gap: 87,
    magType: "ml",
    type: "earthquake",
    title: "M 1.4 - 32km SE of Bodfish, CA"
},
geometry: {
    type: "Point",
    coordinates: [
        -118.254,
        35.3745,
        3.13
        ]
},
id: "ci37604738"
},
"""

