# **RxDB in Action**

## Description

An example that shows how to create an RxDB database and perform simple CRUD and display data 

## How to run

The assumption is that NodeJS and a package manager is already installed.
Use your favorite package manager to install the dependencies and run the project

```bash
npm install
npm run dev
```
The application will then be available by default at http://localhost:5173 if 
the port is not allocated yet if not the output will show where the application 
is running

## Reset browser

This project utilizes IndexedDB for storage of data. If you would like to erase 
the data, this can accomplished by your browser's developer tools

For Example (Chrome):
1. Open Developer Tools (CMD+OPTION+I or CTRL+SHIFT+I) 
2. Navigate to Application > Storage
3. Click `Clear site data` button

## License

This repository is licensed under the [Apache 2.0](https://opensource.org/licenses/apache-2.0).
