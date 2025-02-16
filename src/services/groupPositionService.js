const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createGroupPosition = async (position) => {
  return await prisma.group_position.create({
    data: { position },
  });
};

exports.getAllGroupPositions = async () => {
  return await prisma.group_position.findMany();
};

exports.getGroupPositionById = async (id) => {
  return await prisma.group_position.findUnique({
    where: { id },
  });
};

exports.updateGroupPosition = async (id, position) => {
  return await prisma.group_position.update({
    where: { id },
    data: { position },
  });
};

exports.deleteGroupPosition = async (id) => {
    const groupPosition = await prisma.group_position.findUnique({
      where: { id: parseInt(id) },
    });
  
    if (!groupPosition) {
        return null;
    }
  
    return await prisma.group_position.delete({
      where: { id: parseInt(id) },
    });
  };
