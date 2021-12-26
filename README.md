<center>

![Data Audit & SnapShot Service](./assets/Project%20Banner.png "Data Audit & SnapShot Service")

</center>

# Data Audit and SnapShot Plugin

[![Maintenance](https://img.shields.io/badge/Maintained%3F-Yes-8ebb9c.svg)](https://github.com/H2H-DASP/DataAudit-SnapShotPlugin "Repo Maintained")
[![Ask Us Anything !](https://img.shields.io/badge/Ask%20Us-Anything-1abc9c.svg)](https://GitHub.com/akashchouhan16/ "github.com/akashchouhan16")
[![made-for-Developers](https://img.shields.io/badge/Made%20for-Developers-426658.svg)](https://code.visualstudio.com/ "VSCODE")
[![GitHub issues](https://img.shields.io/github/issues/akashchouhan16/Crypto-Dash.svg)](https://github.com/H2H-DASP/DataAudit-SnapShotPlugin/issues) ![GitHub last commit](https://img.shields.io/github/last-commit/H2H-DASP/DataAudit-SnapShotPlugin.svg) 


The **Data Audit and Snapshot Plugin** (DASP) is a **Node.js** application that provides an easy to use, web-based utility to study the genealogy of data as it gets created, stored, modified, deleted and analysed on a recurring basis.

## 💭 About The Service
DASP plugin exposes simple HTTP endpoints to register client's data items and captures changes on data item over time. The client can register the data item and view all changes on it. The clients have the option to either view all the changes made to their data or be able to view the audit history for the same, based on the time stamp.
* It also includes the ability to add a filter to view the capture history based on categories. 
* The plugin also supports toggle functionality to enable/disable CDC on specific items based on the **data category** (`user defined entity classification`) or based on the **unique ID** for a specific data item.

### Project Stack
* Node.js
* EJS
* Express.js
* MongoDB Atlas
  
--- 
## Developer Environment Set-up
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
  * ![Register Client's Data](./assets/create_log.gif "Register Client's Data")

---

* To check current state of your data item with last modified time stamp: 
   * Make a `GET` request to our service with the **data_id**.
        ```
        /api/getlog/:data_id
        ```
   
   * ![Get Current State of Client's Data](./assets/getlog_dataid.gif "Get Current State of Client's Data")
---
* To fetch all registerd data items with the current state along with last updated time stamp. (For development purpose only)
  * Make a `GET` request to our service
    ```
    /api/getlog
    ```
---
* To fetch the **audit history** for your data, captured by the service
  * Make a `GET` request to our service with the **data_id**. 
    ```
    /api/getcapturehistory/:data_id
    ```
  * The endpoint will provide all the different versions of your data.
  
  * ![Get Capture history for Audit](./assets/getcapturehistory_dataid.gif "Get Capture history for Audit")
---
* To toggle Data Capturing of your data item
  * Make a `PUT` request to the service with your **data_id**. 
    ```
    /api/togglelog/:data_id
    ```
  * ![Toggle Service on the client's Data](assets/toggle_cdc_data_id.gif "Toggle Service on the client's Data")
  * The toggle feature allows the client to **enable/disable Capture Data Change (CDC) service** for the specified data item.
  * Make a `PUT` request to the service with your data **entity**.
    ```
    /api/toggleentitylog/:entity
    ```
  * ![](assets/toggle_cdc_based_on_entity.gif "Toggle service based on the classified \"entity\"")
  * This feature will allow the client to  **enable/disable Capture Data Change (CDC) service** for a data category on our service, specified by the `entity` attribute.
---
 
## [Application Info](https://github.com/H2H-DASP/DataAudit-SnapShotPlugin "Project Details")

> Note: This is a prototype application to provide a web based CDC service.
> 
### Version

**[1.0.2](https://github.com/akashchouhan16/KeepNotes_API "API Version")**

### Release
**[View Release](https://dasp-service.herokuapp.com/ "Data Audit & Snapshot Service Prototype")**
### Maintainer
**[Akash Chouhan](https://github.com/akashchouhan16 "Akash Chouhan")**, **[Kanishk Gupta](https://github.com/kanishkguptagit "Kanishk Gupta")**
### License

**[MIT](https://github.com/H2H-DASP/DataAudit-SnapShotPlugin " LICENSE")**

All rights reserved. Copyright (c) **DASP Team**.

[![forthebadge](https://forthebadge.com/images/badges/cc-0.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

