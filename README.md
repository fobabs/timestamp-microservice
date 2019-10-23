# API Project: Timestamp Microservice for freeCodeCamp

### User Stories: 

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)`.
Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds.
In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`
5. If the date string is **invalid** the api returns a JSON having the structure
`{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

### Example Usage

* https://fobabs-timestamp-microservice-1.glitch.me/api/timestamp/2017-09-12
* https://fobabs-timestamp-microservice-1.glitch.me/api/timestamp/1505174400000

### Example Output

* {"unix":1505174400000,"utc":"Tue, 12 Sep 2017 00:00:00 GMT"}


### To run this project locally:

1. You'll need to clone this repository
```bash
$ git clone https://github.com/fobabs/timestamp-microservice.git
$ cd timestamp-microservice
```
2. Make sure you have node 12.\*.* installed. We used ES6 modules which only support version 12 and later.
3. If you have the devDependency located in package.json installed globally, you can skip this step, otherwise install it using
```bash
$ npm install --only-dev
```
4. Start up the server
```bash
$ npm start
```

**NOTE**: The server is available at `http://localhost:3002` OR `http://127.0.0.1:3002`.