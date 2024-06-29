import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PartnersCard from '../components/home/PartnersCard';
import PartnersTable from '../components/home/PartnersTable';
import Spinner from '../components/Spinner';
import { useAuthContext } from '../hooks/useAuthContext';

const Search = ({ showType, loading }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const [sortedField, setSortedField] = React.useState(null);
  const { user } = useAuthContext()
  let sortedPartners = [...searchResult];

  //here we reorder the data provided to us by what the get function returns
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
    if (user) {
      const search = async () => {
        try {
          if (!key.trim()) {
            //we use axios to get the data from the backend, if the search function is empty
            const res = await axios.get('http://localhost:5550/community-partners', {
              headers: {
                'Authorization': `Bearer ${user.token}`,
              }
            });
            setSearchResult(res.data.data);
            return;
          };

          //we use axios to get the data from the backend, using the parameters provided by the search function
          const res = await axios.get('http://localhost:5550/community-partners', { params: { key: key }, headers: { 'Authorization': `Bearer ${user.token}` } });
          setSearchResult(res.data.data);
        } catch (error) {
          console.log(error)
        }
      }
      search();
    }
  }, [key, user]);
  return (
    <form>
      <div>
        {/*This is the search bar element*/}
        <div className='flex justify-between items-center'>
          <div>
            <BsSearch className='m-4 inline-block' />
            <input
              className='m-1'
              type="text"
              placeholder='Searching...'
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>


          {/*This is the element that the user clicks on to change how the table is sorted*/}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Sort by: </label>

            <table className='inline-block'>

              <thead>
                <tr>
                  <th>
                    <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" type="button" onClick={() => setSortedField('name')}>
                      Name
                    </button>
                  </th>
                  <th>
                    <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" type="button" onClick={() => setSortedField('skill')}>
                      Skill
                    </button>
                  </th>
                  <th>
                    <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" type="button" onClick={() => setSortedField('partnerYear')}>
                      Partnership Year
                    </button>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        {/*This is the element that checks whether the user is in table or card view, and displays either accordingly*/}
        <div>
          {loading ? <Spinner /> : showType == 'Table' ? (<PartnersTable partners={sortedPartners} />) : (<PartnersCard partners={sortedPartners} />)}
        </div>

      </div>
    </form>

  )
}

export default Search