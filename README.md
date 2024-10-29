# Cryptarch Quiz

# Tech Stack

- Framework: React
- Vite.js
- TypeScript
- SWC (Speedy Web Compiler)
- Runtime: Node

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
  
# Hot Reloads
If on windows using WSL, you may not be able to utilize hot reloads -- see [this](https://github.com/oven-sh/bun/issues/4335#issuecomment-1694387577) <br>
How to fix: [fix by moving the project to the linux filesystem in WSL](https://github.com/microsoft/WSL/issues/4739#issuecomment-571688826)
