import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const CreatePartners = () => {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [partnerYear, setPartnerYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { enqueueSnackbar } = useSnackbar();
  const handleSavePartner = () => {
    const data = {
      name,
      skill,
      partnerYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/community-partners', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Partner created successfully!', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error'});
        setLoading(false);
      });


  };


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Partner</h1>
      {loading ? <Spinner/> : ''}
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
      <button className='p-2 bg-sky-400 m-8' onClick={handleSavePartner}>
        Save
      </button>
    </div>
  )
}

export default CreatePartners