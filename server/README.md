# Backend for Project: AI_ChatBot

This is a backend built by express and typescript.Make sure you put both frontend and backend folders in the same directory.

## How to start

Run:

```sh
npm install
```

Update .env file as indicated in .env.example file, also export Google API KEY to your .zshrc or .bashrc file (see below API KEYS section).

Then you can run the following command to start the server.

```sh
npm run dev
```

## Create a postgres database

This project utilizes PostgreSQL as a default database. Before running any sequelize commands, you have to create a new database "final_development" with the development password. Default port for PostgresQL is 5432.

Run the following command in CLI:

```sh
psql -U development
```

After connecting to psql, run

```sh
CREATE DATABASE final_development;
```

After this, you should write the following commands in your terminal to migrate tables and seed the mock data:

```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## API KEYS

This backend requires API keys from OPENAI and Google.

For openAI, go to https://beta.openai.com/ and register an account. Once you are registered, you will be given an API key. Copy and paste the API key to the .env file.

For Google, go to https://console.cloud.google.com/ to activate your Google cloud services account with your gmail address. Once the account is activated, you need to register your credit card for billing, and they will give you a credit of about $386 USD for 3 months usage.

After that, create a new project. Then, make sure your new project is currently chosen (see if the project name shows up next to the "Google Cloud" badge on the top left of the screen).

Once you have made sure, follow the guide from https://cloud.google.com/text-to-speech/docs/libraries to create a service account with your API key (a JSON file).

Make sure you put the following command in your .zshrc or .bashrc file, not your .env file.

```sh
export GOOGLE_APPLICATION_CREDENTIALS="/file/path/to/service-account-file.json"
```

Once you finished the above steps, open a new terminal or source the .zshrc/.bashrc file so that the Google API key will be in your environment.

Now you are good to good.
