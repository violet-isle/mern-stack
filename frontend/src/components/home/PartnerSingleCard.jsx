import React from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const PartnerSingleCard = ({ partner }) => {
    return (
        <div
            key={partner._id}
            className='border-2 border-gray-500 rounded-lg px-2 py-4 m-4 relative hover:shadow-xl'
        >
            <h2 className='absolute top-1 right-2 px-4 bg-red-300 rounded-lg'>
                {partner.partnerYear}
            </h2>
            <h4 className='my-2 text-gray-500 '>{partner._id}</h4>
            <div className='flex justify-start partners-center gap-x-2'>
                <PiBookOpenTextLight className='text-red-300 text-2xl' />
                <h2 className='my-1'>{partner.name}</h2>
            </div>
            <div className='flex justify-start partners-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2xl' />
                <h2 className='my-1'>{partner.skill}</h2>
            </div>
            <div className='flex justify-between partners-center gap-x-2 mt-4 p-4'>
                <Link to={`/community-partners/details/${partner._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                </Link>
                <Link to={`/community-partners/edit/${partner._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                </Link>
                <Link to={`/community-partners/delete/${partner._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                </Link>
            </div>


        </div>
    )
}

export default PartnerSingleCard