import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

// this is a back button on each page so that the user does not have to use browser buttons to traverse the cite
export const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  )
}

export default BackButton