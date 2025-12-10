import { Router, Request, Response } from 'express';
import { Submission } from '../models';
import { validateNetlist } from '../services';
import type { Netlist } from '../types';

const router = Router();

/**
 * POST /api/netlists
 * Upload and validate a new netlist
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { netlist } = req.body as { netlist: Netlist };
    
    if (!netlist) {
      return res.status(400).json({ error: 'Missing netlist in request body' });
    }

    if (!netlist.components || !netlist.nets) {
      return res.status(400).json({ error: 'Netlist must have components and nets' });
    }

    // Run validation
    const validationErrors = validateNetlist(netlist);

    // Store in database
    const submission = new Submission({
      userId: req.userId,
      netlist,
      validationErrors,
    });

    await submission.save();

    res.status(201).json({
      id: submission._id,
      validationErrors,
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/netlists
 * List all submissions for current user
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const submissions = await Submission
      .find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/netlists/:id
 * Get a specific submission
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const submission = await Submission
      .findOne({ _id: req.params.id, userId: req.userId })
      .lean();

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/netlists/:id
 * Delete a submission
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await Submission.deleteOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as netlistRouter };
