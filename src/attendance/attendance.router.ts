import express, { Request, Response } from 'express';
import { matchedData, query, validationResult } from 'express-validator';
import * as EmployeeService from '../employee/employee.service';
import * as AttendanceService from './attendance.service';

export const attendanceRouter = express.Router();

const employeeExists = async (employeeId: number) => {
  const employee = await EmployeeService.getEmployee(employeeId);
  if (!employee) {
    throw new Error('Invalid Employee ID');
  }
};

const employeeHasAlreadyCheckedIn = async (employeeId: number) => {
  const attendance = await AttendanceService.hasAlreadyCheckedIn(employeeId)
  if (attendance) {
    throw new Error(`Employee ${employeeId} has already checked in today!`)
  }
};

const employeeHasNotCheckedInOrHasCheckedOut = async (employeeId: number) => {
  const attendance = await AttendanceService.hasAlreadyCheckedIn(employeeId)
  if (!attendance) {
    throw new Error(`Employee ${employeeId} has not already checked in today!`)
  } else if (attendance.checkOut) {
    throw new Error(`Employee ${employeeId} has already checked out today`)
  }
};

attendanceRouter.post(
  '/checkIn',
  query('employeeId').isNumeric().toInt().custom(employeeExists).custom(employeeHasAlreadyCheckedIn),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    try {
      const { employeeId } = matchedData(request);
      const attendance = await AttendanceService.checkIn(employeeId);
      return response.status(201).json(attendance);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

attendanceRouter.post(
  '/checkOut',
  query('employeeId').isNumeric().toInt().custom(employeeExists).custom(employeeHasNotCheckedInOrHasCheckedOut),
  query('comment').optional().isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }

    try {
      const { employeeId, comment } = matchedData(request)
      const attendance = await AttendanceService.checkOut(employeeId, comment)
      return response.status(200).json(attendance)
    } catch (error: any) {
      return response.status(500).json(error.message)
    }
  }
);
