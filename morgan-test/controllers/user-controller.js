const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/user-service');

// 전체 유저 조회(READ)
const getAllUserInfo = async () => {
  try {
    return await getAllUsers();
  } catch (err) {
    console.error('Error in getAllUsersInfo: ', err.stack);
    throw new Error('Failed to get all users');
  }
};

// 특정 유저 조회(READ)
const getUserInfoById = async (userId) => {
  try {
    return await getUserById(userId);
  } catch (err) {
    console.error('Error in getUserById: ', err.stack);
    throw new Error('Failed to get user by ID');
  }
};

// 새로운 유저 추가(CREATE)
const createUserByData = async (userData) => {
  try {
    return await createUser(userData);
  } catch (err) {
    console.error('Error in createUserByData: ', err.stack);
    throw new Error('Failed to create user');
  }
};

// 유저 정보 수정(UPDATE)
const updateUserById = async (userId, userData) => {
  try {
    return await updateUser(userId, userData);
  } catch (err) {
    console.error('Error in updateUserById: ', err.stack);
    throw new Error('Failed to update user');
  }
};

// 유저 삭제(DELETE)
const deleteUserById = async (userId) => {
  try {
    return await deleteUser(userId);
  } catch (err) {
    console.error('Error in deleteUserById: ', err.stack);
    throw new Error('Failed to update user');
  }
};

module.exports = {
  getAllUserInfo,
  getUserInfoById,
  createUserByData,
  updateUserById,
  deleteUserById
};
