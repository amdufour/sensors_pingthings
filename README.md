# Technical interview with PingThings

## Getting Started with the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the project locally:

`npm install`
`npm start`

---

## Sensors data

The database of sensors is hosted on Firebase.

`https://sensors-pingthings-default-rtdb.europe-west1.firebasedatabase.app/`

Each sensor has a name, latitude, longitude, and tags attributes. The latitude is stored under the key loc_lat, while the longitude is stored under loc_long. The tags consists in an indexed list. For example:

```
s1: {
  name: "volt_001",
  loc_lat: 36.966428,
  loc_long: -95.844032,
  tags: {
    0: "Active",
    1: "Voltage",
  }
}
```

---

##
