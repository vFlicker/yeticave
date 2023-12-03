# YetiCave

YetiCave is an online auction platform for the sale of snowboard and ski equipment. Registered users can create their own auction listings to sell items within a specified time frame. The highest bidder within the agreed-upon time period wins the item.

## Downloading

```bash
git clone {repository URL}
```

## Running the Application

### Create and activate a virtual environment

#### On GNU/Linux or MacOS

```bash
python3.8 -m venv .venv
source .venv/bin/activate
```

#### On Windows

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

#### On GNU/Linux or MacOS

```bash
python3.8 manage.py runserver
```

#### On Windows

```bash
python manage.py runserver
```
