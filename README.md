# YetiCave

YetiCave is an online auction platform for the sale of snowboard and ski equipment. Registered users can create their own auction listings to sell items within a specified time frame. The highest bidder within the agreed-upon time period wins the item.

## Downloading

```bash
git clone {repository URL}
```

## Running the Application

### Create and activate a virtual environment

```bash
python -m venv .venv
cd .venv/Scripts/
. Activate
```

### Install project dependencies

```bash
pip install -r requirements.txt
```

### Starting the Application

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Create superuser

```bash
python manage.py createsuperuser
```
