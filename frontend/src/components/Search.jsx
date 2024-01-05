import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PartnersCard from '../components/home/PartnersCard';
import PartnersTable from '../components/home/PartnersTable';
import Spinner from '../components/Spinner';

const Search = ({showType, loading}) => {
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const [sortedField, setSortedField] = React.useState(null);
  let sortedPartners = [...searchResult];
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
  useEffect(()=>{
    const search = async () => {
      try{
        if(!key.trim()){
          const res = await axios.get('http://localhost:5555/community-partners');
          setSearchResult(res.data.data);
          return;
        };
        const res = await axios.get('http://localhost:5555/community-partners', {params: {key: key}});
        setSearchResult(res.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    search();
  }, [key]);
  return (
  <form>
    <div>
      <button><BsSearch/></button>
      <div>
        <input
          type="text"
          placeholder='Searching...'
          value = {key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <table>
          <thead>
            <tr>
              <th>
                <button type="button" onClick={() => setSortedField('name')}>
                  Name
                </button>
              </th>
              <th>
                <button type="button" onClick={() => setSortedField('skill')}>
                  Skill
                </button>
              </th>
              <th>
                <button type="button" onClick={() => setSortedField('partnerYear')}>
                  Partnership Year
                </button>
              </th>
            </tr>
          </thead>
        </table>
        <div>
          {loading ? <Spinner /> : showType == 'table' ? (<PartnersTable partners={sortedPartners} />) : (<PartnersCard partners={sortedPartners} />)}
    
          {/***searchResult.map((partner, index) => (
          <div key={partner._id}>
            <div>
              <Link to={`/community-partners/details/${partner._id}`}>
                <p>{partner.name}</p>
              </Link>
            </div>
          </div>
          
          ))***/}
        </div>
      
    </div>    
  </form>
  
  )
}

export default Search