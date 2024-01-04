import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  useEffect(()=>{
    const search = async () => {
      try{
        if(!key.trim()){
          setSearchResult([]);
          return;
        };
        const res = await axios.get('http://localhost:5555/community-partners', {params: {key: key}});
        console.log(res.data.data);
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
      {searchResult && searchResult.length >0 && (
        <div>
          {searchResult.map(partner => (
          <div key={partner._id}>
            <div>
              <p>{partner.name}</p>
            </div>
          </div>
          
          ))}
        </div>
      )}
    </div>    
  </form>
  )
}

export default Search