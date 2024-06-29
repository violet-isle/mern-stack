import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useAuthContext } from '../hooks/useAuthContext';
import PartnersCard from '../components/home/PartnersCard';
import PartnersTable from '../components/home/PartnersTable';
import Search from '../components/Search'
import { Link } from 'react-router-dom';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'


import { useSnackbar } from 'notistack';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Home = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('Table');
  const [sortedField, setSortedField] = React.useState(null);
  const { user } = useAuthContext()

  const { enqueueSnackbar } = useSnackbar();

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

    if (user) {
      axios
        .get('http://localhost:5550/community-partners', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        })
        .then((response) => {
          setPartners(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
        });
    }
  }, [user]);
  return (
    <div>




      <div className='flex justify-between items-center'>
        <h1 className='text-xl px-3 py-2 font-medium ml-10 flex items-baseline space-x-4'>Partners List</h1>
        <div className='flex justify-between items-center'>
          <label className="block text-sm font-medium leading-6 text-gray-900 px-2">View mode: </label>
          <div className='flex justify-between items-center'>
            <Listbox value={showType} onChange={setShowType} >
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="ml-3 block truncate">{showType}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"><ChevronDownIcon className="group pointer-events-none size-4 fill-black/60" /></span>
              </ListboxButton>
              <ListboxOptions anchor="bottom" className="z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
                <ListboxOption value={'Table'} className={({ focus }) =>
                  classNames(
                    focus ? 'bg-sky-300 text-white' : '',
                    !focus ? 'text-gray-900' : '',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  )
                }>
                  <CheckIcon className="invisible size-5 group-data-[showType]:visible" />
                  Table
                </ListboxOption>
                <ListboxOption value={'Card'} className={({ focus }) =>
                  classNames(
                    focus ? 'bg-sky-300 text-white' : '',
                    !focus ? 'text-gray-900' : '',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  )
                }>
                  <CheckIcon className="invisible size-5 group-data-[showType]:visible" />
                  Card
                </ListboxOption>

              </ListboxOptions>
            </Listbox>

            <Link to='/community-partners/create'>
              <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
          </div>
        </div>

      </div>
      <Search showType={showType} loading={loading} />
    </div>
  )
}

export default Home