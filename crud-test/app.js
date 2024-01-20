const express = require('express');
const http = require('http');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());

const router = express.Router();
app.use(router);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 전체 유저 조회(READ)
const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (err) {
    console.error('Error in getAllUsers: ', err.stack);
    throw new Error('Failed to get all users');
  }
};

const getAllUserInfo = async () => {
  try {
    return await getAllUsers();
  } catch (err) {
    console.error('Error in getAllUsersInfo: ', err.stack);
    throw new Error('Failed to get all users');
  }
};

router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await getAllUserInfo();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error is getAllUsers route: ', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 특정 유저 조회(READ)
const getUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({ where: { id: userId }});
  } catch (err) {
    console.error('Error in getUserById: ', err.stack);
    throw new Error('Failed to get user by ID');
  }
};

const getUserInfoById = async (userId) => {
  try {
    return await getUserById(userId);
  } catch (err) {
    console.error('Error in getUserById: ', err.stack);
    throw new Error('Failed to get user by ID');
  }
};

router.get('/getUserById/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await getUserInfoById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error is getUserById route: ', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

const createUserByData = async (userData) => {
  try {
    return await createUser(userData);
  } catch (err) {
    console.error('Error in createUserByData: ', err.stack);
    throw new Error('Failed to create user');
  }
};

router.post('/createUser', async (req, res) => {
  try {
    const user = await createUserByData(req.body);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error in createUserByData route: ', err.stack);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

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

const updateUserById = async (userId, userData) => {
  try {
    return await updateUser(userId, userData);
  } catch (err) {
    console.error('Error in updateUserById: ', err.stack);
    throw new Error('Failed to update user');
  }
};

router.put('/updateUser/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const updatedUser = await updateUserById(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error is updateUserById route: ', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

const deleteUserById = async (userId) => {
  try {
    return await deleteUser(userId);
  } catch (err) {
    console.error('Error in deleteUserById: ', err.stack);
    throw new Error('Failed to update user');
  }
};

router.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    await deleteUserById(userId, req.body);
    res.status(204).end();
  } catch (err) {
    console.error('Error is deleteUserById route: ', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
