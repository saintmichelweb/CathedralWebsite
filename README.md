# St-Michel-Website
website for Paroisse saint Michel Kigali 

**How to run the app using docker** 

- navigate to the root of the StMichelWebsite project and run `docker compose up --build`

**How to run the app using npm** 

- step 1: run the database using the comand `docker compose up --build stmp-db`
- step 2: navigate into both Api and Portal folders and `run npm i`
- step 3: navigate into Portal folder and `copy .env-example` into a new file named `.env`
- step 4: navigate into both Api folder and `copy .env.npm` into a new file named `.env`
- setp 5: run the Portal in its own terminal using `npm run dev`
- setp 6: run the Api in its own terminal using `npm run start`, to use nodemon use `npm run dev`