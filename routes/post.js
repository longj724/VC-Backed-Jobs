const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  console.log(req.body);
  const { title, post, user_id } = req.body;

  const userExists = prisma.user.findUnique({
    id: user_id,
  });

  if (!userExists) {
    return res.status(400).json({
      msg: 'User not found',
    });
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      post,
      user_id,
    },
  });

  res.json(newPost);
});

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const posts = await prisma.post.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      title: true,
      post: true,
      created_at: true,
    },
  });

  res.json(posts);
});

module.exports = router;
