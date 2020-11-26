# Like 1t

This project was made as a simple, single-page web application that allows the user to:

- Search for a movie
- Click on a movie title to view more details
- Rate the movie positively or negatively

The deployed project may be accessed [here](https://like-1t.web.app/).

## Start up

If you would like to run this project locally, after cloning the project please make sure to include an **.env** file in the main project with the following code.

`SKIP_PREFLIGHT_CHECK=true`

Additionally, for the app to receive movie data, you must get an API Key from [OMDb API](http://www.omdbapi.com/). This key needs to be appended the end of each call made to OMDb. \* I will specify where this key needs to be placed below (inside the section titled **Inside the Project**).

### Firebase setup

This project in particular also utilizes Google's **Firebase Realtime Database** and **Cloud Functions**. As such, it is required that you set up a Firebase account [here](https://firebase.google.com/). This will allow you to create your own Firebase project and receive a unique [firebase config](https://support.google.com/firebase/answer/7015592).

- Create a file called `firebaseConfig.js` in the root directory of this project and export the firebase config you received previously there. The file _src/index.js_ requires this config to initialize the firebase app.

Here is an example of what the config should look like:

```
export const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxx",
  authDomain: "<projectName>.firebaseapp.com",
  databaseURL: "https://<projectName>.firebaseio.com",
  projectId: "<projectId>",
  storageBucket: "<projectName>.appspot.com",
  messagingSenderId: "xxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxx"
};
```

- After you have created a Firebase account follow the directions [here](https://firebase.google.com/docs/database/web/start) to set up the **Realtime Database**. The database can be set to `Test Mode` for testing and the Security Rules allowing both read & writes.

- To set up **Firebase Cloud Functions**, refer to the directions [here](https://firebase.google.com/docs/functions/get-started). Within the Firebase console, you should be able to select your project and open the **Functions** section via the sidebar.

**IMPORTANT**: Because this project makes call to external APIs (services not part of Google), you are required to upgrade the project's billing plan to the **Blaze Plan**. This involves registering a method of payment with your Firebase account, however, by running these functions locally will likely not incur charges due to the number of invocations required to reach that threshold.

You can read more about the plan's billing [here](https://firebase.google.com/pricing).

- If at this point you have not already installed **Firebase's CLI** follow the instructions [here](https://firebase.google.com/docs/cli#setup_update_cli) to do so.

### Inside the Project

At this point you should have done the following:

- [ ] Created a Firebase project via the Firebase console
- [ ] Enabled Firebase Realtime Database
- [ ] Enabled Firebase Cloud Functions & have a Blaze Plan
- [ ] Installed the Firebase CLI

Once you have the **Firebase CLI** make sure you do the following:

- Set the API key you received earlier from OMDb\* as an environmental variable within firebase functions. Within your terminal type the following command (replacing the words in brackets with a keyname and your API key):

`firebase functions:config:set [someProperty].key="[THE API KEY]"`

(You can ensure that it worked by typing firebase:config:get into the terminal.)

- Then navigate to `functions/index.js` and find all the occurances of `functions.config().omdb.key` with `functions.config().[whateverYouNamedYourKey]`.

Finally, after running `npm install` and `firebase deploy --only functions` the app can be run locally with `npm run start` and will be hosted at [localhost:3000](http://localhost:3000/).

**Note**: Ensure that dependencies are installed both in the root project folder and within the Firebase Functions folder (/functions).

## Future Potential Features

- [ ] Create a page the displays all movies rated by users. Currently, movies rated by users are only recorded in the Realtime Database and don't make any apparent changes on the front end of the app.
