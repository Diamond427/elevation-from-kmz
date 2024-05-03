# Automation tool for elevation from KMZ file

## What it does

- looks for every kmz file in specific diretory (`KMZ_FILES_DIRECTORY`)
- for every kmz file, get elevation data using api
- save the result to txt file

## How to use it

- Change `KMZ_FILES_DIRECTORY` and `OUTPUT_DIRECTORY` in .env file
- Copy `proxy.example.js` to `proxy.js` and change the proxy list

### examples

```env
KMZ_FILE_DIRECTORY=./kmz_directory/   # relative
OUTPUT_DIRECTORY=E:/out-dir/          # absolute
```

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

## Testing

Test if all txt files within `OUTPUT_DIRECTORY` contains altitude attribute

```bash
npm test
```
