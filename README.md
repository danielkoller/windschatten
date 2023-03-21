# 🚲 Windschatten

Windschatten is a Next.js web application developed using TypeScript and React, created specifically for Vienna's biking community. The app focuses on assisting users in discovering the most efficient bike routes, helping them save money by comparing the cost of biking versus car usage. 

Additionally, Windschatten fosters a sense of community by connecting users with potential bike commute partners within their home and work districts, promoting a more enjoyable and sustainable commuting experience.


## Tech Stack

- Next.js (v13)
- React
- TypeScript
- JavaScript
- TailwindCSS/DaisyUI
- PostgreSQL Database
- Jest (testing)
- Playwright (testing)
- Postman (API testing & development)
- Figma (UI/UX planning)
- DrawSQL (database schema planning)


## Lessons Learned

Throughout the development of Windschatten, I have significantly improved my skills in Next.js (v13) and React, while also gaining valuable experience working with the Google Maps API. 

This project marked my first venture into using Tailwind CSS and Daisy UI, both of which quickly became essential tools in my development toolkit, thanks to their ease of use and functionality. 

Moreover, this project has reinforced the importance of thorough planning, as it has a substantial impact on the efficiency and overall success of the development process.


## Features

- Fast Bike Route Finder - Discover the most efficient bike routes in Vienna.
- Cost Savings Calculator - Estimate the money saved by biking instead of using a car.
- Bike Commute Partner Matching - Connect with 
- Chat Functionality - Interact with fellow bike riders sharing the same route, fostering a sense of community and camaraderie.

## Setup instructions

1. Clone the project on your local machine (run each line individually):

```bash
git clone <url>
cd <repo name>
yarn
```

2. Connect to default database as admin:

- On Windows

```bash
psql -U postgres
```

- On macOS

```bash
psql postgres
```

- On Linux

```bash
sudo -u postgres psql
```

3. Set up the database:

```bash
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD <user password>;
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

4. After queries are successfully ran, quit `psql` and connect to the database

```bash
\q
```

- On Windows & macOS

```bash
psql -U <user name> <database name>
```

- On Linux

```bash
sudo -u <user name> psql -U <user name> <database name>
```

5. In the repository's directory, run migrations using ley:

```bash
yarn migrate up
```

6. Create a .env file:

- Open the project in your code editor
- Copy the content of the .env.example file into the .env file
- Replace xxxxxxxx with the access information
- add .env file to .gitignore

7. (Optional) Start deployment server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
## Acknowledgements

The idea for Windschatten was born during the Coding Austria Hackathon, which happened in July 2022. The challenge was to develop a solution for a better mobility outside of cities. 

Thanks to @gstrobl and @mt-sarah for this. 
