import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { axiosInt } from '../../Hook/useAxios';
/* eslint-disable react/prop-types */
import { format } from 'date-fns';


function MyCar({ car, fetchMycars, setLoading,setEdit }) {
  const { image, model, price,  features, _id } = car;


  const handleDelete = async id => {
    setLoading(true);
    try {
      const { data } = await axiosInt.delete(`/cars/${id}`);
      console.log(data);
      toast.success('Data Deleted Successfully!!!');
      setLoading(true);
      fetchMycars();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  const modernDelete = id => {
    toast(t => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}>
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const openModal = id => {
    const modal = document.getElementById('edit-car'); 
    modal.showModal();
    setEdit(id)
  };

  return (
    <tr>
      <td className="px-4 py-2">
        <img src={image} alt={car.model} className="w-16 h-16 object-cover" />
      </td>
      <td className="px-4 py-2 text-text">{model}</td>
      <td className="px-4 py-2 text-text">${price}</td>
      <td className="px-4 py-2 text-text">{features}</td>
      <td className="px-4 py-2 text-text">
        {format(new Date(), 'dd/mm/yyyy')}
      </td>
      <td className="px-4 py-2">
        <div className="flex gap-3 m-auto">
          

          <BiEdit
            onClick={() => openModal(_id)}
            className="font-bold text-xl cursor-pointer hover:text-green-400 duration-300 transition-colors"
          />{' '}
          <MdOutlineDeleteOutline
            onClick={() => modernDelete(_id)}
            className="font-bold text-xl cursor-pointer hover:text-red-400 duration-300 transition-colors"
          />
        </div>
      </td>
    </tr>
  );
}

export default MyCar;
