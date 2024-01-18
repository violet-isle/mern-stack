import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const PartnersTable = ({ partners }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border boder-slate-600 rounded-md'>No.</th>
              <th className='border boder-slate-600 rounded-md'>Name</th>
              <th className='border boder-slate-600 rounded-md'>Contact</th>
              <th className='border boder-slate-600 rounded-md max-md:hidden'>Skill / Category</th>
              <th className='border boder-slate-600 rounded-md max-md:hidden'>Partnership Year</th>
              <th className='border boder-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr key={partner._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {partner.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {partner.contact != null ? partner.contact.name : '0'}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {partner.skill}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {partner.partnerYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/community-partners/details/${partner._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/community-partners/edit/${partner._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/community-partners/delete/${partner._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default PartnersTable