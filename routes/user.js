const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  const userExists = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });

  if (userExists) {
    return res.status(400).json({
      msg: 'User already exists',
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: name + '@prisma.io',
    },
  });

  res.json(newUser);
});

module.exports = router;
