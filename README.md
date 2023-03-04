# Technical interview with PingThings

## Getting Started with the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the project locally:

```
npm install
npm start
```

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

## Next steps...

1. Complete unit and integration tests (I only had time for a few simple tests).
2. When adding a new sensor, allow user to create new tags.
3. When editing an existing sensor, allow user to edit the tags.
4. Make changes persistent when adding or editing a sensor.
5. Allow user to delete a sensor.
6. Allow searching for multiple names at a time.
7. Update available filters when user makes a selection. For example, based on the current selection some tags or names might not be available anymore.
8. Refine the mobile layout by collapsing the filters and making them fixed on the screen as we scroll the list of sensors.
9. Complete cross-browser tests (currently tested on Chrome and Firefox).
10. Make the Sensors component smaller: Use another component to fetch and filter the data.
11. Create unique ids for newly added sensors.
12. Update filter options when creating a new sensor.
