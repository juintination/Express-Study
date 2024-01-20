const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 전체 유저 조회(READ)
const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    console.error('Error in getAllUsers: ', err.stack);
    throw new Error('Failed to get all users');
  }
};

// 특정 유저 조회(READ)
const getUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({ where: { id: userId }});
  } catch (err) {
    console.error('Error in getUserById: ', err.stack);
    throw new Error('Failed to get user by ID');
  }
};

// 새로운 유저 추가(CREATE)
const createUser = async (userData) => {
  try {
    return await prisma.user.create({
    data: userData,
    })
  } catch (err) {
    console.error('Error in createUser: ', err.stack);
    throw new Error('Failed to create user');
  }
};

// 유저 정보 수정(UPDATE)
const updateUser = async (userId, userData) => {
  try {
    return await prisma.user.update({
    where: { id: userId },
    data: userData,
    })
  } catch (err) {
    console.error('Error in createUser: ', err.stack);
    throw new Error('Failed to update user');
  }
};

// 유저 삭제(DELETE)
const deleteUser = async (userId) => {
  try {
    return await prisma.user.delete({
    where: { id: userId },
    })
  } catch (err) {
    console.error('Error in createUser: ', err.stack);
    throw new Error('Failed to delete user');
  }
};
  
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
