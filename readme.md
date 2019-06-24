# Upload and Graph View
This service is used to let user upload JSON file of temperature on batteries and view a graph representation.

File is uploaded in chunks and then the data is upserted in MongoDb which is then used to create and view graphs.


## Getting Started
  Clone this repo into your local system and install the dependencies and thats it!

## PrePrerequisites
  1. You need to download and install [NodeJs](https://nodejs.org/en/download/) depending on your Operating System.
  2. Install MongoDB on your local system which could be downloaded from [here](https://www.mongodb.com/download-center/community). Make sure your mondo server is running on port# *27017*. Or you can explicitly specify port# using CLI as

          mongod --port 27017
  3. Install node dependencies using

          npm i
## Running the Server
  1. To spin node server(Node server is running on port# *3000*)

          npm run
  2. Navigate to [index](localhost:3000/) page in browser and you are good to go.
  3. To upload temperature files, navigate to [Upload Page](http://localhost:3000/upload) where you can select your JSON file. Only single file upload is supported.
  4. Once you have uploaded your files, you can then navigate to [Graphs](http://localhost:3000/graph) and select the temperature file you uploaded to see the Graph representation of it. Temperature data is fetched in chunks so it might take some time to get the complete data depending on your file size.

  *Note:* Currently your complete data is fetched from Db and not just data of an hour.


## Built With
  1. [Express](https://expressjs.com/) is being used to create server.
  2. To create graph representation, [Chart.js](https://www.chartjs.org/) is being used, which is quite simple and easy to use.
