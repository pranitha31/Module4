# Schema Design Fundamentals – Theory

## What schema design is and what a database schema represents
Schema design is the process of planning and defining the logical structure of a relational database. A **database schema** represents the blueprint of how data is organized, including tables, columns, relationships, constraints, and data types. It describes how information will be stored, accessed, and maintained, ensuring that the database supports the application’s requirements.

## Why schema design is required before writing backend code
Schema design must be completed before backend code because the database structure directly influences how the application interacts with data. Without a clear schema, developers risk writing inefficient queries, facing integration issues, and struggling with scalability. A well-designed schema ensures smooth communication between backend logic and the database, reducing errors and improving performance.

## How poor schema design impacts data consistency, maintenance, and scalability
- **Data consistency**: Poor schema design can lead to duplicate or conflicting records due to missing constraints.
- **Maintenance issues**: Complex queries and difficulty in updating data arise when tables are not normalized.
- **Scalability problems**: Inefficient joins, redundant data, and poor indexing slow down performance as the database grows.

## What validations are in schema design and why databases enforce validations
Validations are rules applied to ensure data integrity. Common examples include:
- **NOT NULL**: Prevents empty values in mandatory fields.
- **UNIQUE**: Ensures no duplicate values in a column.
- **DEFAULT**: Provides a fallback value when none is supplied.
- **PRIMARY KEY**: Guarantees each record is uniquely identifiable.

Databases enforce these validations to maintain accuracy, reliability, and consistency of stored data.

## The difference between a database schema and a database table
- **Database schema**: The overall design or structure of the database, including tables, relationships, and constraints.
- **Database table**: A single component within the schema that stores data in rows and columns.

## Why a table should represent only one entity
Each table should represent one entity (e.g., `Students`, `Courses`) to avoid confusion and redundancy. Mixing multiple entities in one table complicates queries and makes normalization difficult, leading to poor data organization.

## Why redundant or derived data should be avoided in table design
Redundant or derived data increases storage costs and risks inconsistency. For example, storing both `DateOfBirth` and `Age` is unnecessary because age can be calculated from the date of birth. Avoiding redundancy ensures data integrity and reduces maintenance overhead.

## The importance of choosing correct data types while designing tables
Choosing correct data types ensures efficient storage and accurate representation of values. For example:
- Use `INT` for numeric IDs.
- Use `VARCHAR` for variable-length text.
- Use `DATE` for dates instead of strings.

Correct data types improve query performance, reduce errors, and optimize memory usage.

---

**Conclusion:**  
Schema design is the foundation of relational databases. A well-planned schema ensures clarity, consistency, and scalability, while poor design leads to inefficiency and errors. By enforcing validations, avoiding redundancy, and choosing correct data types, developers can build robust databases that support applications effectively.
