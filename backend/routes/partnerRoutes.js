import express from "express";
import { getPartners, getPartner, editPartner, createPartner, deletePartner } from '../controllers/partnerController.js'
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router()

// Require authentication for all partner routes
router.use(requireAuth)
  

// Route that the frontend uses to draw data that responds to the search query or all database data
router.get('/', getPartners);


// Route that the frontend uses to draw data about a specific community partner
router.get('/:id', getPartner);


// Route that the frontend draws data from and then edits and pushes data back to, when updating community partner info
router.put('/:id', editPartner);


//Route the frontend uses to upload new partner data to the database
router.post('/', createPartner);


//Route for frontend to send data to, to delete a partner from a database
router.delete('/:id', deletePartner);

export default router;