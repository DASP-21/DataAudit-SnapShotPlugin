# DASP Service

The Data Audit and Snapshot Plugin (DASP) is a service to study the genealogy of data as it gets created, stored, modified, deleted and analysed on a daily basis.

## Description

This plugin captures changes on data item over time. A user can register the data item and view all changes on it over time. The user can view either all changes or modifications for a time stamp or filter it to view only the changes done by the specific user. The plugin also supports toggle functionality for capture of data history.

## Getting Started

### Dependencies/Tools

* NodeJS
* ExpressJS
* MongoDB

### Initial Set-up

* Clone this repository
  * `git clone https://github.com/H2H-DASP/DataAudit-SnapShotPlugin.git`
*  Install dependencies
  * `npm i --save`
*  Run the development server
  * `npm run dev`

### Service Endpoints

* To register any data item: 
```
/api/createlog
```
* To check current state of data item with last updated time stamp: 
```
/api/getlog
```
* To To check current state of data item with last updated time stamp for a specific user: 
```
/api/getlog/:data_id
```
* To compare the capture history and current data state: 
```
/api/getcapturehistory/:data_id
```
* To toggle updation of data item for a specific user: 
```
/api/togglelog/:data_id
```

## License
