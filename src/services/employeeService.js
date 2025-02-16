const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createEmployee = async (employeeData) => {
  try {
    const newEmployee = await prisma.employees.create({
      data: employeeData,
    });
    return newEmployee;
  } catch (error) {
    throw new Error('Error creating employee');
  }
};

const getEmployeeById = async (id) => {
  try {
    const employee = await prisma.employees.findUnique({
      where: { id },
    });
    return employee;
  } catch (error) {
    throw new Error('Employee not found');
  }
};

const updateEmployee = async (id, updatedData) => {
  try {
    const updatedEmployee = await prisma.employees.update({
      where: { id },
      data: updatedData,
    });
    return updatedEmployee;
  } catch (error) {
    throw new Error('Error updating employee');
  }
};

const deleteEmployee = async (id) => {
  try {
    await prisma.employees.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Error deleting employee');
  }
};

module.exports = {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
