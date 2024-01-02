import React from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsBookshelf, BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import PartnerSingleCard from './PartnerSingleCard';

const PartnersCard = ({ partners }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {partners.map((item) =>
                <PartnerSingleCard key={item._id} partner = {item} />
            )}
        </div>
    )
}

export default PartnersCard