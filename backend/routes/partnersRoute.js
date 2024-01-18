import express from "express";
import { Partner } from "../models/partnerModel.js";

const router = express.Router()

//Route for getting all partner data

router.get('/', async (request, response) => {
    try {
        const {key, page, limit} = request.query
        
        var partners = await Partner.find({});
        if (key != null){
            partners = await Partner.find({name: {$regex:key, $options: 'i'}});
        }
        return response.status(200).json({
            count: partners.length,
            data: partners,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for getting a partner's data by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const partner = await Partner.findById(id);

        return response.status(200).json({partner});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for updating a partner
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.name || !request.body.skill || !request.body.partnerYear) {
            return response.status(400).send({message: "Send all required fields!"});
        }
        const { id } = request.params;
        const result = await Partner.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Partner not found' });
        }
        
        return response.status(200).send({ message: 'Partner data updated succesfully' });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for Save a new Partner
router.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.skill || !request.body.partnerYear) {
            return response.status(400).send({
                message: "Send all required fields!"
            });
        }
        const newPartner = {
            name: request.body.name,
            skill: request.body.skill,
            partnerYear: request.body.partnerYear,
            contact: request.body.contact,
        };  

        const partner = await Partner.create(newPartner);

        return response.status(201).send(partner);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for delete a Partner
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Partner.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Partner not found' });
        }
        
        return response.status(200).send({ message: 'Partner data deleted succesfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;