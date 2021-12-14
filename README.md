# Data Audit and SnapShot Service

The **Data Audit and Snapshot Plugin** (DASP) is a **Node.js** application that provides a easy to use pluggable utility to study the genealogy of data as it gets created, stored, modified, deleted and analysed on a recurring basis.

## About DASP
DASP plugin exposes simple HTTP endpoints to register client's data items and captures changes on data item over time. A user can register the data item and view all changes on it over time. The user can view either all changes or modifications for a time stamp or filter it to view only the changes done by the specific user. 
The plugin also supports toggle functionality for capture of data history based on **data category** (`user defined entity classification`) or based on the **unique ID** for the specific data item.

### Project Stack
* Node.js
* EJS
* Express.js
* MongoDB Atlas
  
--- 
## Developer environment Set-up
* Make sure, the following are installed in the local system.
  * `Node` and `npm`
  * `mongodb`
  * `git`
* Steps to set up the service on development enviroment
  * Clone this repository `git clone https://github.com/H2H-DASP/DataAudit-SnapShotPlugin.git`
  *  Install dependencies 
     ```
        npm i --save
     ```
  *  Run the development server
     ```
        npm run dev
     ```
  * Visit `http://localhost:5000`

---

## DASP Service Endpoints

* To Plug the DASP utility to client's data item:
  * Make a `POST` request to register it onto our service. 
    ```
    /api/createlog
    ```
  * Once client's data item is registered, it can be identified by a **data_id** which is unique for every data item registered on DASP.

---

* To check current state of your data item with last modified time stamp: 
   * Make a `GET` request to our service with the **data_id**.
        ```
        /api/getlog/:data_id
        ```
---
* To fetch all registerd data items with the current state along with last updated time stamp. (For development purpose only)
  * Make a `GET` request to our service
    ```
    /api/getlog
    ```
---
* To fetch the Audit History for your data, captured by the service
  * Make a `GET` request to our service with the **data_id**. 
    ```
    /api/getcapturehistory/:data_id
    ```
  * The endpoint will provide all the different versions of your data.
---
* To toggle Data Capturing of your data item
  * Make a `PUT` request to the service with your **data_id**. 
    ```
    /api/togglelog/:data_id
    ```
  * The toggle feature allows the client to **enable/disable Capture Data Change (CDC) service** for the specified data item.
  * Make a `PUT` request to the service with your data **entity**.
    ```
    /api/toggleentitylog/:entity
    ```
  * This feature will allow the client to  **enable/disable Capture Data Change (CDC) service** for a data category on our service, specified by the `entity` attribute.
---
 