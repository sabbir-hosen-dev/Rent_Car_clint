/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import { axiosInt } from '../Hook/useAxios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import IsLodding from '../Pages/IsLodding';

function EditCarModal({ id,fetchMycars }) {
  const [availability, setAvailability] = useState(null);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axiosInt
        .get(`/cars/${id}`)
        .then(res => {
          setEdit(res.data);
          setLoading(false)
          // Initialize availability as a Date object if it's a valid ISO string
          if (res.data?.availability) {
            setAvailability(parseISO(res.data.availability)); // Convert ISO string to Date object
          }
        })
        .catch(err => console.log(err.message));
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    // Collect data from the form
    const newCar = {
      model: form.model.value.trim(),
      price: form.price.value.trim(),
      availability: availability ? availability.toISOString() : null,
      registration: form.registration.value.trim(),
      features: form.features.value.trim(),
      description: form.description.value.trim(),
      image: form.image.value.trim(),
      location: form.location.value.trim(),
    };

    // Validate the form fields

    const validationErrors = {};
    if (newCar.model.split(' ').length < 2) {
      validationErrors.model = 'Car model must contain at least two words.';
    }
    if (newCar.description.split(' ').length < 5) {
      validationErrors.description =
        'Description must contain at least five words.';
    }
    if (newCar.features.split(',').length < 2) {
      validationErrors.features =
        'Features must contain at least two features, separated by commas.';
    }
    if (!/^\d+(\.\d+)?$/.test(newCar.price) || parseFloat(newCar.price) <= 0) {
      validationErrors.price = 'Price must be a positive number.';
    }
    if (!/^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(newCar.image)) {
      validationErrors.image = 'Image must be a valid URL.';
    }
    if (!newCar.availability) {
      validationErrors.availability = 'Please select an availability date.';
    }

    // Set errors and stop submission if there are validation errors
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const bookingCount = edit.bookingCount;
    const postDate = edit.postDate
    const user = edit.user
    const cardData = { ...newCar,bookingCount,postDate, user  };

  

    try {
      await axiosInt.patch(`/cars/${id}`, cardData);
      toast.success('Car updated successfully!');

      form.reset();
      fetchMycars();
      setAvailability(null);
      setEdit({});
      setErrors({});

      document.getElementById('edit-car').close();
    } catch (error) {
      console.error('Error editing car:', error);
      toast.error('Failed to edit car. Please try again.');
    }

  };

  return (
    <>
      <dialog id="edit-car" className="modal">
        {id && (
          <div className="modal-box bg-blog">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <h1 className="text-2xl text-text font-bold">Edit Car</h1>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="">
              <section className="flex justify-center items-center py-5 ">
                <div className="w-full max-w-lg  rounded-lg p-6">
                  {loading ? (
                    <IsLodding />
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Car Model */}
                      <div>
                        <label
                          htmlFor="model"
                          className="block mb-2 text-sm text-text font-medium">
                          Car Model
                        </label>
                        <input
                          required
                          type="text"
                          name="model"
                          id="model"
                          defaultValue={edit?.model}
                          placeholder="Car Model"
                          className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        {errors.model && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.model}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {/* Daily Rental Price */}
                        <div className="w-full">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm text-text font-medium">
                            Daily Rental Price
                          </label>
                          <input
                            required
                            type="number"
                            name="price"
                            id="price"
                            defaultValue={edit?.price}
                            placeholder="Price per day"
                            className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.price}
                            </p>
                          )}
                        </div>

                        {/* Registration Number */}
                        <div className="w-full">
                          <label
                            htmlFor="registration"
                            className="block mb-2 text-sm text-text font-medium">
                            Registration Number
                          </label>
                          <input
                            required
                            type="text"
                            name="registration"
                            id="registration"
                            defaultValue={edit?.registration}
                            placeholder="Vehicle Registration"
                            className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          {errors.registration && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.registration}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {/* Availability Date */}
                        <div className="w-full">
                          <label
                            htmlFor="availability"
                            className="block mb-2 text-sm text-text font-medium">
                            Availability Date
                          </label>
                          {edit?.availability && (
                            <DatePicker
                              required
                              selected={availability}
                              onChange={date => setAvailability(date)}
                              className="bg-input min-w-[224px]  border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholderText="Select Availability Date"
                            />
                          )}
                          {errors.availability && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.availability}
                            </p>
                          )}
                        </div>

                        {/* Location */}
                        <div className="w-full">
                          <label
                            htmlFor="location"
                            className="block mb-2 text-sm text-text font-medium">
                            Location
                          </label>
                          <input
                            required
                            type="text"
                            name="location"
                            id="location"
                            defaultValue={edit?.location}
                            placeholder="Car Location"
                            className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          />
                          {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="w-full">
                        <label
                          htmlFor="features"
                          className="block mb-2 text-sm text-text font-medium">
                          Features
                        </label>
                        <input
                          required
                          type="text"
                          name="features"
                          id="features"
                          defaultValue={edit?.features}
                          placeholder="e.g., GPS, AC"
                          className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        {errors.features && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.features}
                          </p>
                        )}
                      </div>

                      {/* Image URL */}
                      <div>
                        <label
                          htmlFor="image"
                          className="block mb-2 text-sm text-text font-medium">
                          Image URL
                        </label>
                        <input
                          required
                          type="url"
                          name="image"
                          id="image"
                          defaultValue={edit?.image}
                          placeholder="Image URL"
                          className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        {errors.image && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.image}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm text-text font-medium">
                          Description
                        </label>
                        <textarea
                          required
                          name="description"
                          id="description"
                          defaultValue={edit?.description}
                          placeholder="Car Description"
                          className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          rows="3"></textarea>
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.description}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-primaryP text-white py-2 rounded-lg hover:bg-primaryP/80">
                        Save Car
                      </button>
                    </form>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

export default EditCarModal;
