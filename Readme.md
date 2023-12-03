# YetiCave

YetiCave is an online auction platform for the sale of snowboard and ski equipment. Registered users can create their own auction listings to sell items within a specified time frame. The highest bidder within the agreed-upon time period wins the item.

## Downloading

```bash
git clone {repository URL}
```

## Running the Application

### Installing NPM Modules

```bash
npm install
```

### Building

```bash
npm run docker:build
```

### Creating Tables After Starting the Application

Execute all SQL instructions located in the `src/database` directory, specifically the `schema.sql` file.

### Starting the Application

```bash
npm run start:dev
```
