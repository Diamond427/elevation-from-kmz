# Automation tool for elevation from KMZ file

## What it does

- looks for every kmz file in specific diretory (`KMZ_FILES_DIRECTORY`)
- for every kmz file, get elevation data using api
- save the result to txt file

## How to use it

Just change `KMZ_FILES_DIRECTORY` and `OUTPUT_DIRECTORY` in env file

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
node main.js
```