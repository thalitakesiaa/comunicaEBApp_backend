const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const groupPositionService = require("../services/groupPositionService");
const employeeService = require("../services/employeeService");
const bcrypt = require('bcrypt');

const {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../services/employeeService");
const { required } = require("joi");

const createEmployeeController = async (req, res) => {
  const {
    email,
    name,
    council_registration,
    working_hours,
    affiliation,
    location,
    group_position_id,
    user_id,
  } = req.body;

  let newEmployee = null;  // Inicializando newEmployee

  try {
    let newUserId = user_id;
    let groupPosition = await groupPositionService.getGroupPositionById(group_position_id);

    if (!groupPosition) {
      return res.status(404).json({ message: "Cargo não encontrado com o ID informado" });
    }

    console.log("Encontrou grupo");

    // Verifica se o user_id foi informado
    if (user_id) {
      const existingUser = await prisma.user.findUnique({
        where: { id: user_id },
      });
      if (!existingUser) {
        return res.status(404).json({ message: "Usuário não encontrado com o ID informado" });
      }

      console.log("Id do usuário existente");

      // Verifica se o usuário já está associado a outro funcionário
      const userAssigned = await prisma.employees.findUnique({
        where: { user_id },
      });
      if (userAssigned) {
        return res
          .status(400)
          .json({ message: "Este usuário já está associado a um funcionário" });
      }

      // Se o user_id for fornecido, só atualiza o funcionário
      newEmployee = await prisma.employees.update({
        where: { user_id },
        data: {
          email,
          name,
          council_registration,
          working_hours,
          affiliation,
          location,
          group_position_id,
          updated_at: new Date(),
        },
      });

      console.log("Funcionário atualizado");
    } else {
      console.log("Criando funcionário");

      // Cria o funcionário sem um usuário associado
      newEmployee = await prisma.employees.create({
        data: {
          email,
          name,
          council_registration,
          working_hours,
          affiliation,
          location,
          group_position_id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      console.log("Funcionário salvo", newEmployee);

      // Criação do usuário apenas se o funcionário for criado com sucesso
      const hashedPassword = await bcrypt.hash("padraoSenhaEb", 10);
      console.log("Criptografou a senha");

      const newUser = await prisma.user.create({
        data: {
          email: newEmployee.email,
          password: hashedPassword,
          profile: groupPosition.position,
          employee_id: newEmployee.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      console.log("Usuário salvo");

      // Atualiza o funcionário com o ID do novo usuário
      newUserId = newUser.id;
      const updatedEmployee = await prisma.employees.update({
        where: { id: newEmployee.id },
        data: {
          user_id: newUserId,
          updated_at: new Date(),
        },
      });

      console.log("Funcionário atualizado com o ID do usuário");

      newEmployee = updatedEmployee; 
    }
    console.log(newEmployee);
    return res.status(201).json(newEmployee);  // Agora sempre retorna newEmployee
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao criar funcionário", error: error.message });
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
    const employee = await getEmployeeById(parseInt(id));
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateEmployeeController = async (req, res) => {
  const { id } = req.params;
  const {
    email,
    name,
    council_registration,
    working_hours,
    affiliation,
    location,
    group_position_id,
  } = req.body;

  try {
    const employee = await prisma.employees.findUnique({
      where: { id: parseInt(id) },
    });

    if (!employee) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }

    let updatedFields = {
      name,
      council_registration,
      working_hours,
      affiliation,
      location,
      group_position_id,
    };

    if (email && email !== employee.email) {
      const existingEmail = await prisma.employees.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return res.status(400).json({ message: "Email já em uso" });
      }

      updatedFields.email = email;
    }

    const updatedEmployee = await prisma.employees.update({
      where: { id: parseInt(id) },
      data: updatedFields,
    });

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar funcionário", error: error.message });
  }
};

const deleteEmployeeController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEmployee(parseInt(id));
    return res.status(200).json({ message: "Employee deleted successfully" });
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
