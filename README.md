# Cryptarch Quiz


# How to Play
You are presented with a 3x3 grid <br>
Each square represents the intersection of a row and column, corresponding to an item that fits both categories (e.g., Legendary Sniper Rifle) <br >
Your goal is to find and match the correct item for each square <br >
Log in to save your progress and track your highest scores!

# Tech Stack

- Framework: React
- Vite.js
- TypeScript
- SWC (Speedy Web Compiler)
- Runtime: Node

# How to Run:
 - npm run start <br>
 
This will start up a docker container that builds the frontend/server and runs the app <br>
Better to **run through the server build steps first**, as you need to create the db schema and relations. <br>
After that, you can always just run this.
In the future, we'll probably just make a script that downloads the db seperately -- and generates the schema/relations -- instead of doing it on server startup.

You can also just run the server and frontend seperately
# How to Run Frontend (Client)
cd frontend <br>
npm i <br>
npm run <script here> (e.g. dev) <br>

# Server
cd server <br>
npm i <br>
npm run <script here> <br>
Scripts: <br> 
 -  **dev**: run server via the index.ts file (use this when developing/writing code) <br> 
 -  **build**: compile typescript <br> 
 -  **start**: runs the compiled code
 -  **drizzle-kit**: once the db has been downloaded via the server, run this to generate our schema and relations files -- only will need to run if bungie changes the db

