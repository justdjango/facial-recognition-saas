# Facial recognition API SAAS

[![alt text](https://github.com/justdjango/facial-recognition-saas/blob/master/thumbnail.png "Logo")](https://www.justdjango.com)

To learn how to build this application, [head over to our website.](https://www.justdjango.com)

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

## Deployment workflow
Change the manage.py to use the production settings
Change the constants.js file inside src to have DEBUG set to false
Push to the production environment
Run python manage.py migrate
Run npm run build
Run python manage.py collectstatic

## Disclaimer
This project does not cover concepts of image recognition - it is a proof of concept teaching how to take an idea from scratch to something real.
