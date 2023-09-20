import { Employee } from '@prisma/client';
import { db } from '../utils/db.server';

export const listEmployees = async (): Promise<Employee[]> => {
  return db.employee.findMany({ include: { attendance: true } });
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  return db.employee.create({ data: employee })
}

export const getEmployee = async (id: number): Promise<Employee | null> => {
  return db.employee.findUnique({
    where: {
      id
    }
  });
};
