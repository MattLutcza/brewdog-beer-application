# MattBrewDogBeerApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Production (AWS S3)

This code was deployed to AWS via the S3 service: `http://brewdog-beer-application.s3-website.us-east-2.amazonaws.com`

## Production (AWS CloudFront)
While deploying the application to S3 was simple, it unfortunately didn't provide support for the angular routes. If the user navigated directly to the angular routes, it would cause 404 errors. To fix this, I used AWS CloudFront: `https://d33ra9d2ehj9w9.cloudfront.net/home`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
You can also run `npm run start`, if you prefer npm scripts.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
You can also run `npm run build`, if you prefer npm scripts.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). For coverage reports, run `ng test --codeCoverage=true` or, if you prefer npm scripts, `npm run test`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
(Note: I did not test this out yet)

