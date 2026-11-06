# Assignment 9: Database Integration Testing Evidence

**Testing Client:** Postman & MongoDB Compass
**Base URL:** `http://localhost:3000`
**Database Environment:** Local MongoDB instance (`assignment9` database, `items` collection)

### 1. POST /api/items (Create)
* **Method:** POST
* **Payload:** `{ "name": "First DB Item", "status": "Pending" }`
* **Expected Result:** The server successfully parses the body, creates a new database document, generates a unique `_id`, and returns a `201 Created` status.
* **Evidence:**
![POST Request](image_ba9968.png)

### 2. GET /api/items/:id (Read)
* **Method:** GET
* **Expected Result:** The server queries the database by the unique `_id` and successfully returns the matching document with a `200 OK` status.
* **Evidence:**
![GET Request](image_ba9944.png)

### 3. PUT /api/items/:id (Update)
* **Method:** PUT
* **Payload:** `{ "name": "Updated DB Item", "status": "Completed" }`
* **Expected Result:** The server targets the item by its `_id`, successfully patches the properties to match the new payload, and returns the updated document with a `200 OK` status.
* **Evidence:**
![PUT Request](image_ba98ef.png)

### 4. DELETE /api/items/:id (Delete)
* **Method:** DELETE
* **Expected Result:** The server successfully clears the target entry out of the database permanently and returns a success message with a `200 OK` status.
* **Evidence:**
![DELETE Request](image_ba98cd.png)

### 5. Persistent Database Verification
* **Method:** MongoDB Compass GUI
* **Expected Result:** Confirms that the Express endpoints are saving data to a persistent, local database cluster rather than a temporary in-memory array.
* **Evidence:**
![MongoDB Compass GUI](image_ba7727.png)