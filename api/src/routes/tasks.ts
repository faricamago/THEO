import { Router } from 'express';

const router = Router();

// Tasks feature has been removed
router.get('/', (req, res) => {
  res.json([]);
});

export default router;
