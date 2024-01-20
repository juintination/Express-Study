const express = require('express');
const router = express.Router();

const {
  getAllUserInfo,
  getUserInfoById,
  createUserByData,
  updateUserById,
  deleteUserById,
} = require('../controllers/user-controller');

// 전체 유저 조회(READ)
router.get('/all', async (req, res) => {
  try {
    const users = await getAllUserInfo();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error is getAllUsers route: ', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 특정 유저 조회(READ)
router.get('/:userId', async (req, res) => {
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
router.post('/create', async (req, res) => {
  try {
    const user = await createUserByData(req.body);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error in createUserByData route: ', err.stack);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// 유저 정보 수정(UPDATE)
router.put('/update/:userId', async (req, res) => {
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
router.delete('/delete/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    await deleteUserById(userId, req.body);
    res.status(204).end();
  } catch (err) {
    console.error('Error is deleteUserById route: ', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
