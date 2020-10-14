#Guide
##Firebase
```
1) go to firebase console
2) create new project
3) in the project create new realtime database
4) in the realtime database import JSON (data.json from repo)
5) in the setting -> service accounts -> generate private key
6) copy this file to leaflet_map folder
```
##NodeJS
```
1) git clone
2) cd leaflet_map
3) npm install
4) in the routes/index.js add private key
var serviceAccount = require("your-private-key.json");
5) npm start
5) go to localhost:3000/map
```

