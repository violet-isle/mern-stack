import { Partner } from "../models/partnerModel.js";
import { isValidPhoneNumber } from 'react-phone-number-input'
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  

// Route that the frontend uses to draw data that responds to the search query or all database data
const getPartners = async (request, response) => {
    try {
        const { key, page, limit } = request.query

        var partners = await Partner.find({});
        if (key != null) {
            partners = await Partner.find({ name: { $regex: key, $options: 'i' } });
        }
        return response.status(200).json({
            count: partners.length,
            data: partners,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};


// Route that the frontend uses to draw data about a specific community partner
const getPartner =  async (request, response) => {
    try {
        const { id } = request.params;
        const partner = await Partner.findById(id);

        return response.status(200).json({ partner });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};


// Route that the frontend draws data from and then edits and pushes data back to, when updating community partner info
const editPartner = async (request, response) => {
    try {
        if (!request.body.name || !request.body.skill || !request.body.partnerYear) {
            return response.status(400).send({ message: "Send all required fields!" });
        }
        if (!emailRegex.test(request.body.contact.email)) {
            return response.status(400).send({
                message: "Email is in the wrong format!"
            });
        }
        if (!isValidPhoneNumber(request.body.contact.phone)) {
            return response.status(400).send({
                message: "Phone Number is in the wrong format!"
            });
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
};


//Route the frontend uses to upload new partner data to the database
const createPartner = async (request, response) => {
    try {
        if (!request.body.name || !request.body.skill || !request.body.partnerYear) {
            return response.status(400).send({
                message: "Send all required fields!"
            });
        }
        if (!emailRegex.test(request.body.contact.email)) {
            return response.status(400).send({
                message: "Email is in the wrong format!"
            });
        }
        if (!isValidPhoneNumber(request.body.contact.phone)) {
            return response.status(400).send({
                message: "Phone Number is in the wrong format!"
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
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};


//Route for frontend to send data to, to delete a partner from a database
const deletePartner = async (request, response) => {
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
};

export {getPartners, getPartner, editPartner, createPartner, deletePartner};