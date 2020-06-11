# Configure a production environment to use a PostgreSQL database in Heroku

These instructions are for creating an app in Heroku, provisioning a PostgreSQL
database for it, and configuring your app to use PostgreSQL.

1. Log into Heroku
2. Create a new app
3. Configure automatic deploys from github
    1. Select the Deploy tab in the app config
    2. Choose "Github"
    3. Log in and allow access to github from Heroku
    4. Search for and select the repo you want to deploy from
    5. Select the branch you want to deploy from
4. Configure your app to connect to PostgreSQL
    1. Have an environment config property in knexfile.js that is configured for
       PostgreSQL (see knex documentation for details)
    2. The connection string will be published by Heroku to your app as an
       environment variable named DATABASE_URL - use this environment variable
       as the connection string in the PostgreSQL config object (eg
       process.env.DATABASE_URL)
5. Provision a PostgreSQL database for your Heroku app
    1. Select the Resources tab in your Heroku app config
    2. Type "postgres" in the Add-ons search box
    3. Select "Heroku Postgres"
    4. Select the "Heroku - free" option, unless you want to pay $$ for it. :)
    5. Select the Settings tab for your app
    6. Click on the "Reveal Config Vars" under the "Config Vars" section
    7. Confirm the DATABASE_URL environment variable exists
    8. If necessary, create a DB_ENV environment variable with a value that
       matches the config name of the PostgreSQL database in knexfile.js.
6. Commit and push your code to the repo/branch (Heroku will deploy it)
7. Run knex migrate:latest and knex seed:run to create and populate your
   database in Heroku
    1. Either install the Heroku npm package (npm i heroku), or plan to run it
       with npx
    2. Run ```[npx] heroku run knex migrate:latest -a <yourAppName>``` 
       (note that "npx" is optional if the heroku cli is installed globally)
    3. Run ```[npx] heroku run knex seed:run -a <yourAppName>```
       (note that "npx" is optional if the heroku cli is installed globally)

