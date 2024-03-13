import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import PartnersCard from '../components/home/PartnersCard';
import PartnersTable from '../components/home/PartnersTable';
import Search from '../components/Search'
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


const Home = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [sortedField, setSortedField] = React.useState(null);
  let sortedPartners = [...partners];
  if (sortedField !== null) {
    sortedPartners.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 0;
    });
  }
  useEffect(() => {
    setLoading(true);

    axios
      .get('http://localhost:5550/community-partners')
      .then((response) => {
        setPartners(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error!', { variant: 'error' });
      });

  }, []);
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>

      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Partners List</h1>
         
        
        <Link to='/community-partners/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>

      </div>
      <Search showType={showType} loading={loading}/>
    </div>
  )
}

export default Home