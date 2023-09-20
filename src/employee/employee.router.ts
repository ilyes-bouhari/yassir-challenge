import { Employee } from '@prisma/client';
import express, { Request, Response } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import * as EmployeeService from './employee.service';

export const employeeRouter = express.Router()

employeeRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const employees = await EmployeeService.listEmployees()
    return response.status(200).json(employees)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})

employeeRouter.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  body('department').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    try {
      const data: Employee | any = matchedData(request);
      const employee = await EmployeeService.createEmployee(data);
      return response.status(201).json(employee);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
