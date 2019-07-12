# Upload and Graph View
This service is used to let user upload JSON file of temperature and view a graph representation.

File is uploaded in chunks and then the data is upserted in MongoDb which is then used to create and view graphs.


## Getting Started
  Clone this repo into your local system, install the dependencies and thats it!

## Prerequisites
  1. You need to download and install [NodeJs](https://nodejs.org/en/download/) depending on your Operating System.
  2. You need to provide MongoDB Url and Port#. To Download MongoDb [here](https://www.mongodb.com/download-center/community) and start mongo daemon process using below command
          mongod
  3. You can either provide your config criteria in *.env* file(check .env_description).
  4. Install node dependencies using
          npm i

## Running the Server
  1. To spin node server(default server port#3000, you can change it using your environment file as mentioned above)

          npm run
  2. Navigate to [index](localhost:3000/) page in browser and you are good to go.
  3. To upload temperature files, navigate to [Upload Page](http://localhost:3000/upload) where you can select your JSON file. Only single file upload is supported.
  4. Once you have uploaded your files, you can then navigate to [Graphs](http://localhost:3000/graph) and select the temperature file you uploaded to see the Graph representation of it. Temperature data is fetched in chunks so it might take some time to get the complete data depending on your file size.

  *Note:* Currently your complete data is fetched from Db and not just data of an hour.


## Built With
  1. [Express](https://expressjs.com/) is being used to create server.
  2. To create graph representation, [Chart.js](https://www.chartjs.org/) is being used, which is quite simple and easy to use.
