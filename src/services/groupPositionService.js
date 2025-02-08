const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createGroupPosition = async (position) => {
  return await prisma.groupPosition.create({
    data: { position },
  });
};

exports.getAllGroupPositions = async () => {
  return await prisma.groupPosition.findMany();
};

exports.getGroupPositionById = async (id) => {
  return await prisma.groupPosition.findUnique({
    where: { id },
  });
};

exports.updateGroupPosition = async (id, position) => {
  return await prisma.groupPosition.update({
    where: { id },
    data: { position },
  });
};

exports.deleteGroupPosition = async (id) => {
    const groupPosition = await prisma.groupPosition.findUnique({
      where: { id: parseInt(id) },
    });
  
    if (!groupPosition) {
        return null;
    }
  
    return await prisma.groupPosition.delete({
      where: { id: parseInt(id) },
    });
  };
