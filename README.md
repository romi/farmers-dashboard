# farmers-dashboard
A web interface to visualize the image data and image analyses collected on farms with the Romi tools.

## Requirement

Name  | Version 
----- | --------
**node** | **>= 14**
**docker** | **>= 19**
**docker-compose** | **>= 1.26**

### Install dependencies
```sh
$> yarn # or npm install
```

## Usages

Run App in Developement
```sh
$> yarn start # or npm start
```

Build App
```sh
$> yarn build # or npm run build
```

## Docker
[Docker](https://www.docker.com/) is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

Deploy website
```sh
$> docker-compose up --build -d
```

> Deploy without docker-compose
> ```sh
> $> docker built -f ./Dockerfile -t `image_name`
> $> docker run -p 80:80 `image_name`
> ```

## Test

[Cypress](https://www.cypress.io/) is an end-to-end testing tools for anything that runs in a browser.


> Don't forget to `Install dependencies` before running any command below

Run cypress with GUI
```sh
$> yarn cypress:open # or npm run cypress:open
```

Run cypress without GUI
```sh
$> yarn cypress # or npm run cypress
```

Run cypress with Docker without GUI
```sh
$> docker-compose -f docker-compose.yml -f docker-cypress.yml up --build
```

## Lint

[Eslint](https://eslint.org/) is a static code analysis tool for identifying problematic patterns found in JavaScript code.


> Don't forget to `Install dependencies` before running any command below

Run linting
```sh
$> yarn lint # or npm run lint
```