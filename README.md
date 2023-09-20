# Yassir coding challenge

A nodejs API for managing employees and their attendance.

## Getting started

### 1. Clone project and install dependencies

Clone this repository :

```
git clone git@github.com:ilyes-bouhari/yassir-challenge.git
```

Install npm dependencies :

```
cd yassir-challenge
npm install
```

### 2. Create database

Run the following command to create your database. This also creates the `Employee` and `Attendance` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`.

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/api/employees?date={date}`: Fetch all employees
  - Query Parameters
    - `date` ( optional ) : This filters employees by `date` ( e.g. `2023-09-20` )

### `POST`

- `/api/employees`: Create a new employee
  - Body:
    - `firstName: String` ( required ): The firstname of the employee
    - `lastName: String` ( required ): The lastname of the employee
    - `department: String` ( required ): The department in which the employee is assigned to
- `/api/checkIn?employeeId={employeeId}`: Check in an employee by its `id`
  - Query Parameters:
    - `employeeId: Number` ( required ): The employee id
- `/api/checkOut?employeeId={employeeId}&comment={comment}`: Check out an employee by its `id`
  - Query Parameters:
    - `employeeId: Number` ( required ): The employee id
    - `comment: String` ( optional ): The attendance comment

## Switch to another database (e.g. PostgreSQL, MySQL, SQL Server, MongoDB)

If you want to try this example with another database than SQLite, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block.

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### PostgreSQL

For PostgreSQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

Here is an example connection string with a local PostgreSQL database:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/notesapi?schema=public"
}
```

### MySQL

For MySQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

Here is an example connection string with a local MySQL database:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://janedoe:mypassword@localhost:3306/notesapi"
}
```

### Microsoft SQL Server

Here is an example connection string with a local Microsoft SQL Server database:

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

### MongoDB

Here is an example connection string with a local MongoDB database:

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
}
```

</details>
