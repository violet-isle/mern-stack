import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


// allows user to edit partners
const EditPartner = () => {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [partnerYear, setPartnerYear] = useState('');
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    //send request to backend for info
    setLoading(true);
    axios.get(`http://localhost:5550/community-partners/${id}`)
      .then((response) => {
        setName(response.data.partner.name);
        setSkill(response.data.partner.skill);
        setPartnerYear(response.data.partner.partnerYear);
        response.data.partner.contact != null ? setContact(response.data.partner.contact) : contact;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
        setLoading(false);
      });

  }, [])

  // and then send more info back once user clicks save
  const handleEditPartner = () => {
    const data = {
      name,
      skill,
      partnerYear,
      contact,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5550/community-partners/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Partner edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
        setLoading(false);
      });


  };

  //user interface for editing, gets data first to display what is currently in the database
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Partner</h1>
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
            type="text"
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
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => setContact({ name: contact.name, email: contact.email, phone: e.target.value })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <button className='p-2 bg-sky-400 m-8' onClick={handleEditPartner}>
        Save
      </button>
    </div>
  )
}

export default EditPartner