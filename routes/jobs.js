const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/all-jobs', async (req, res) => {
  const jobs = await prisma.$queryRaw`
    SELECT p.*, c.name FROM "public"."Position" AS P JOIN "public"."Company" AS c ON p.company_id = c.id
  `;

  res.json(jobs);
});

router.get('/jobs-test', async (req, res) => {
  const jobs = await prisma.$queryRaw`
    SELECT p.*, c.name FROM "public"."Position" AS P JOIN "public"."Company" AS c 
    ON p.company_id = c.id
    LIMIT 10
  `;

  res.json(jobs);
});

router.get('/companies', async (req, res) => {
  const allCompanies = await prisma.company.findMany();

  res.json(allCompanies);
});

module.exports = router;
