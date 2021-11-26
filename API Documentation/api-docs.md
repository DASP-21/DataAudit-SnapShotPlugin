# DASP Service Documentation

**Development Reference Docs**
## Public End Points

* **GET `/api/getlog`**
    * To Get back the entire log sheet with Data Capture History in **change_log** for a given **data_id**.
    * **Response Object**
      ```json
      {
      "_id": "<CHANGE_LOG_DB_ID>",
      "data_id": "<DATA_ID>",
      "timestamp": "<LAST_UPDATED_TIMESTAMP>",
      "content": "<CURRENT_DATA_STATE>",
      "change_log": [
        {
        "version": "<FIRST_CAPTURE_STATE_UNIQUE_ID>",
        "timestamp": "<FIRST_CAPTURE_TIME>",
        "content": "<EARLIEST_DATA_STATE>",
        "_id": "<DB_REFERENCE_ID>"
        },
        {
        "version": "<SECOND_CAPTURE_STATE_UNIQUE_ID>",
        "timestamp": "<SECOND_CAPTURE_TIME>",
        "content": "<SECOND_DATA_STATE>",
        "_id": "<DB_REFERENCE_ID>"
        },
        {...}
       ],
       "__v": 3
      }
      ``` 

* **GET `/api/getlog/:data_id`**
    * To get back the Capture History for a specific data item with id **data_id**
    * **Response Object for 1234**
    ```json
      {
      "_id": "61a12926e83f502bcfa373de",
      "data_id": 1234,
      "timestamp": "2021-11-26T18:36:22.846Z",
      "content": "New Sample Content - P4",
      "change_log": [
        {
        "version": 12341,
        "timestamp": "2021-11-26T17:46:17.619Z",
        "content": "New Sample Content - P1",
        "_id": "61a1292fe83f502bcfa373e1"
        },
        {
        "version": 12342,
        "timestamp": "2021-11-26T17:46:17.619Z",
        "content": "New Sample Content - P2",
        "_id": "61a12932e83f502bcfa373e5"
        },
        {
        "version": 12343,
        "timestamp": "2021-11-26T17:46:17.619Z",
        "content": "New Sample Content - P3",
        "_id": "61a12936e83f502bcfa373ea"
        }],
       "__v": 3
      }
    ```
* **POST /api/createlog**
    * To create a new data object.
    * To rewrite the data object and also capture the previous state of the data object in its **change_log**.
    * **Request Object**
      ```json
        {
          "id": "",
          "content": ""
        }
      ```
    * **Response Object [Success on New Data]**
      ```json
        {
          "message": "Log created successfully",
          "result": "success"
        }
      ```
    * **Response Object [Success on Change Data Capture]**
      ```json
        {
          "message": "[*]Data History Captured",
          "result": "success"
        }
      ```
---