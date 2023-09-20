import { Attendance } from '@prisma/client';
import { db } from '../utils/db.server'

export const checkIn = async (id: number): Promise<Attendance> => {
  return db.attendance.create({
    data: {
      employee: {
        connect: {
          id
        }
      }
    },
    include: {
      employee: true
    }
  });
};

export const hasAlreadyCheckedIn = async (employeeId: number): Promise<Attendance | null> => {
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate).setDate(todayDate.getDate() + 1)

  return db.attendance.findFirst({
    where: {
      employeeId: {
        equals: employeeId
      },
      checkIn: {
        gte: new Date(todayDate.toISOString().slice(0, 10)),
        lt: new Date(new Date(tomorrowDate).toISOString().slice(0, 10))
      }
    }
  });
};

export const checkOut = async (employeeId: number, comment?: string): Promise<Attendance | null> => {
  const attendance = await db.attendance.findUnique({ where: { id: employeeId } });
  const checkOut = new Date();

  return db.attendance.update({
    where: {
      id: employeeId
    },
    data: {
      checkOut,
      duration: checkOut.getTime() - new Date(attendance?.checkIn ? attendance.checkIn : '').getTime(),
      comment
    },
    include: {
      employee: true
    }
  })
}
