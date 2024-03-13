import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

//page for deleting a partner from the database
const DeletePartner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeletePartner = () => {
    setLoading(true);
    //send delete request to backend
    axios
      .delete(`http://localhost:5550/community-partners/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Partner deleted successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
        setLoading(false);
      });


  };

  //user interface for confirmation of intent to delete partner
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Partner</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this partner?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeletePartner}
        >
          Yes, remove this partner from the database
        </button>

      </div>
    </div>
  )
}

export default DeletePartner