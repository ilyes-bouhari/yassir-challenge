import express from 'express';
import { attendanceRouter } from './attendance/attendance.router';
import { employeeRouter } from './employee/employee.router';

const app = express();

app.use(express.json())
app.use('/api/employees', employeeRouter);
app.use('/api', attendanceRouter);

app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
