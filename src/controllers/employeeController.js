const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const positionService = require("../services/positionService");
const employeeService = require("../services/employeeService");
const userService = require("../services/userService")

const createEmployeeController = async (req, res) => {
  try {
    const employeeData = req.body;
    const result = await employeeService.createEmployeeAndUser(employeeData);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar funcionário e usuário:", error);
    return res.status(400).json({ message: error.message });
  }
};

const getAllEmployeesController = async (req, res) => {
  try {
    const employees = await prisma.employees.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar funcionários", error: error.message });
  }
};

const getEmployeeByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employeeService.getEmployeeById(parseInt(id));
    if (!employee) {
      return res.status(404).json({ error: `Usuário não encontrado com o ID: ${id}` });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateEmployeeController = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    
    const updatedEmployee = await employeeService.updateEmployee(id, updatedData);

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteEmployeeController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await employeeService.deleteEmployee(parseInt(id));
    return res.status(200).json( result );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
  deleteEmployeeController,
};
