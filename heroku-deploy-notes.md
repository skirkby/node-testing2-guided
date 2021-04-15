## Steps to deploy to Heroku with PostgreSQL support:

1. Create a new app in Heroku.com
2. Connect your app to your github repo/branch (like we did before)
3. Deploy your app to Heroku with commit/push
    - Save, commit, and push your project to github.
    - The app will be downloaded and deployed by Heroku
    - Use the Heroku CLI to view logs in realtime: $ heroku logs -a yourappname
      --tail
4. Test the app 
    - Click the "Open App" button in Heroku
    - You should see the default response for GET /
    - Try GET /hobbits - you should see hobbits data
        - This data is coming from the dev database in ./data/hobbits.db3
        - NOTE: As of today (Feb 17, 2021), it seems SQLite isn't working on
          Heroku Dynos. See https://devcenter.heroku.com/articles/sqlite3, not
          sure if this is the reason.
5. Review knexfile.js
    - Note the Postgres config object under "production" in knexfile.js
    - There is a connection URL variable that gets its value from the
      DATABASE_URL environment variable.
    - The value for this variable will be created automatically by Heroku when
      you add a Postgres server to your app (step 6 below)
6. Add Postgres to your app in Heroku
    - In Heroku, with your app selected, choose the "Resources" menu/tab (second
   from the left at the top), 
    - In the "Add-ons" search box, type "postgres", and wait for results to
     appear
    - choose the "Heroku Postgres" option
    - Choose the "Hobby Dev - Free" payment plan
7. Review the connection string in Heroku
    - Adding Postgres to your app causes Heroku to create a DATBASE_URL
     environment variable with the Postgres server connection URL as its value
    - The "production" Knex config property in knexfile.js is already set up to
      use this environment variable, as well as set up an ssl: property needed
      to make a non-SSL connection to Postgres on Heroku.
    - You don't need to do anything on the code side - it's already set up.
8. Install the "pg" database driver module for Postgres
    - npm i pg
9. Push the code again
    - A new deploy will happen, this time with the Postgres connection in place
10. Create the DB_ENV environment variable in Heroku
    - Click the "Settings" menu/tab
    - Click "Reveal Config Vars"
    - Add a new var named DB_ENV, and set its value to "production" (without
     quotes)
11. Test the app
    - You should get an error from Postgres
    - Because there are not tables in the database
12. Populate the Postgres database in Heroku
    - From the heroku CLI, execute the following two commands:
        - heroku run knex migrate:latest --env production -a yourappname
        - heroku run knex seed:run --env production -a yourappname
    - This will create the table(s) and add records to the database
13. Test GET /hobbits again - you should have data from Postgres.