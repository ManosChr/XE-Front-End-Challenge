# Location Search with Autocomplete Functionality

## Description

> This application accepts location keywords from a user.
> It consumes dataset from an Autocomplete Location API and returns suggestions for those keywords.
> The description of the location service can be found [here](http://35.180.182.8/swagger/index.html).
> If a user selects one of those results and then clicks the Search button, then the app will direct them to Google and search for that location.
>
>**The app uses:**
>* Jquery, Jquery-ui
>* Sass

## Instructions for running locally

- clone repo

```
git clone https://github.com/ManosChr/XE-Front-End-Challenge.git
```

- cd to repo folder

```
cd XE-Front-End-Challenge
```

- install locally (generates static files)

```
npm install
```

- serving locally with live reload

```
npm start
```

- build a compressed and prefixed style.css for production

```
npm run build:css
```

## Specifications

- Once the user types more than one character, the application starts calling the service to get results. Along with the keywords, the application also passes the language of the browser in order to retrieve translated results.
- User selects one of the results returned from the location service.
- User can clean the input field by clicking the delete button and start the proccess again.
- If the user presses the Search button, then the app will direct them to Google and search for that location.

## Improvements and new features to be added

- [ ] Migrate to ES6
- [ ] Add tests for bugs
- [ ] Prepare distribution app for production (Babel, Webpack)