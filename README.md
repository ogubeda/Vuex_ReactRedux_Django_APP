# Play It

It's a web application made with Vuex, Postgres and Django Rest Framework.

## Installation

1. Clone this repository https://github.com/ogubeda/Vuex_ReactRedux_Django_APP.git
2. Install Docker and Docker Compose.
3. Go to the backend directory and launch the docker-compose file:
    - `sudo docker-compose up`
4. Open a terminal, access the container with `sudo docker exec -it usersRestAPI01 sh`, and execute the following commands:
    - `python3 manage.py makemigrations`
    - `python3 manage.py migrate`
5. Then go to the frontend directory and do:
    - `npm install`
    - `npm start`

## Technologies

### Backend
- Djando Rest Framework

### Frontend
- Vue 3.0 <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png"></code>
- Vuex 4.0 <code><img height="20" src="https://raw.githubusercontent.com/justintaddei/v-shared-element/assets/logo.png"></code>
- TypeScript <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"></code>

### Databases 
- Postgres <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgres/postgres.png"></code>

### Libraries
- JWT
- WebPack
- Jest