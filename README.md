# Facial recognition API SAAS

This project is a facial recognition API. Users are able to create an account, utilise a free trial of the API, and create a membership to have full access to the API. Payments are handled with Stripe. The API is built with the Django Rest Framework and the frontend is built with React. The image recognition library is OpenCV. The project is deployed on Ubuntu using Digital Ocean.

## Backend development workflow

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

To learn how to build this application, [head over to our website.](https://www.justdjango.com)
