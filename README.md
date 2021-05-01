This application provides a web-based interface for managing restaurant orders.

After you start up the application, you can access tha main page at: http://localhost:4200/

BACKEND:
In order to run the application, you have to execute these commands:
pip intall pipenv
pipenv --three
pipenv install mysql
pipenv install sqlalchemy
pipenv install mashmallow
pipenv install flask

These commands above are only required once, before the first start.

Then you will find in the bacneekd folder a script:
./bootstrap.sh
This will start up the backend


FRONTEND:
You have to install algular cli first:
npm install -g @angular/cli

This is also required once

then you can start the frontend with:
ng serve -o
