# Database Fundamentals – Conceptual Understanding

## 1. Why is db.json not suitable as a database for real projects?
A simple JSON file (`db.json`) is not a true database system. It has several limitations:
- **Performance:** File-based storage becomes slow when handling large amounts of data or frequent read/write operations.
- **Scalability:** It cannot efficiently manage growing datasets or support multiple users accessing data simultaneously.
- **Reliability:** There is no built-in mechanism for backups, recovery, or transaction handling, making data prone to corruption or loss.
- **Concurrency:** Multiple users writing to the file at the same time can cause conflicts and inconsistencies.

---

## 2. Ideal Characteristics of a Database System
A robust database system should provide more than just storage. Key characteristics include:
- **Performance:** Fast query execution and efficient handling of large datasets.
- **Concurrency:** Ability to support multiple users accessing and modifying data at the same time without conflicts.
- **Reliability:** Ensures data is consistently available and protected against failures.
- **Data Integrity:** Maintains accuracy and consistency of data through constraints and validation.
- **Scalability:** Can grow with the application, handling increasing data and user load.
- **Fault Tolerance:** Recovers gracefully from hardware or software failures, ensuring minimal downtime.

---

## 3. Types of Databases and Their Use Cases

### Relational Databases (SQL)
- **Definition:** Store data in structured tables with rows and columns, using SQL for queries.
- **Use Cases:** Banking systems, e-commerce platforms, ERP systems, applications requiring strict consistency.
- **Examples:** MySQL, PostgreSQL, Oracle, SQL Server.

### Non-Relational Databases (NoSQL)
- **Definition:** Store data in flexible formats such as documents, key-value pairs, graphs, or wide-column stores.
- **Use Cases:** Social media apps, real-time analytics, IoT data, applications needing high scalability and flexible schemas.
- **Examples:** MongoDB (document-based), Redis (key-value), Cassandra (wide-column), Neo4j (graph).

---
