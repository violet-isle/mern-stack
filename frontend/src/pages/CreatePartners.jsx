import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import Input from 'react-phone-number-input/input'

const CreatePartners = () => {
  const [name, setName] = useState('');
  
  const [skill, setSkill] = useState('');
  const [partnerYear, setPartnerYear] = useState('');
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  
//create a partner with all of the info provided by user 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSavePartner = () => {
    const data = {
      name,
      skill,
      partnerYear,
      contact,
    };
    setLoading(true);
    //send data to database
    axios
      .post('http://localhost:5550/community-partners', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Partner created successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
        setLoading(false);
      });


  };

//user interface w input
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Partner</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Partnership Year</label>
          <input
            type="number"
            value={partnerYear}
            onChange={(e) => setPartnerYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Name</label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) => setContact({ name: e.target.value, email: contact.email, phone: contact.phone })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Email</label>
          <input
            type="text"
            value={contact.email}
            onChange={(e) => setContact({ name: contact.name, email: e.target.value, phone: contact.phone })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Phone Number</label>
          <Input
            country="US"
            value={contact.phone}
            onChange={(e) => setContact({ name: contact.name, email: contact.email, phone: e})}
            className='border-2 border-gray-500 px-4 py-2 w-full'
            />
        </div>
      </div>
      <button className='p-2 bg-sky-400 m-8' onClick={handleSavePartner}>
        Save
      </button>
    </div>
  )
}

export default CreatePartners