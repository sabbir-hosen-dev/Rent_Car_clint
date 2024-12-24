import { useState } from 'react';
import { toast } from 'react-hot-toast'; // Toast notifications
import DatePicker from 'react-datepicker'; // Date Picker for availability
import 'react-datepicker/dist/react-datepicker.css';
import useAuthContext from './../Hook/useAuthContext';
import { axiosInt } from '../Hook/useAxios';

function AddCar() {
  const [availability, setAvailability] = useState(null);
  const [errors, setErrors] = useState({});
  const { user } = useAuthContext();

  const handleSubmit =  e => {
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
      validationErrors.description = 'Description must contain at least five words.';
    }
    if (newCar.features.split(',').length < 2) {
      validationErrors.features = 'Features must contain at least two features, separated by commas.';
    }
    if (!/^\d+(\.\d+)?$/.test(newCar.price) || parseFloat(newCar.price) <= 0) {
      validationErrors.price = 'Price must be a positive number.';
    }
    if (
      !/^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(newCar.image)
    ) {
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

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const bookingCount = 0;
    const postDate = new Date();

    const cardData = { ...newCar, owner:user, bookingCount, postDate };
    // console.log(cardData)
    // Simulate saving to the database
    try {
      axiosInt.post('/add-car', cardData);
      toast.success('Car added successfully!');
      form.reset();
      setAvailability(null);
      setErrors({});
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Failed to add car. Please try again.');
    }
  };

  return (
    <section className="flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-bgB shadow-lg rounded-lg p-6">
        <h1 className="text-2xl text-text font-bold mb-6">Add New Car</h1>
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
              placeholder="Car Model"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">{errors.model}</p>
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
                placeholder="Price per day"
                className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
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
              <DatePicker
                required
                selected={availability}
                onChange={date => setAvailability(date)}
                className="bg-input min-w-[224px]  border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholderText="Select Availability Date"
              />
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
                placeholder="Car Location"
                className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
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
              placeholder="e.g., GPS, AC"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
             {errors.features && (
              <p className="text-red-500 text-sm mt-1">{errors.features}</p>
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
              placeholder="Image URL"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
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
              placeholder="Car Description"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              rows="3"></textarea>
               {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primaryP text-white py-2 rounded-lg hover:bg-primaryP/80">
            Save Car
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCar;
