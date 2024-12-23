import { useState } from "react";
import { toast } from "react-hot-toast"; // Toast notifications
import DatePicker from "react-datepicker"; // Date Picker for availability
import "react-datepicker/dist/react-datepicker.css";

function AddCar() {
  const [availability, setAvailability] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Collect data from the form
    const newCar = {
      model: form.model.value,
      price: form.price.value,
      availability: availability ? availability.toISOString() : null,
      registration: form.registration.value,
      features: form.features.value,
      description: form.description.value,
      image: form.image.value,
      location: form.location.value,
      bookingCount: 0,
      dateAdded: new Date().toISOString(),
    };

    // Simulate saving to the database
    try {
      console.log("Car details submitted:", newCar); // Log for testing
      toast.success("Car added successfully!");
      form.reset(); // Reset the form
      setAvailability(null); // Clear the date picker
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center bg-gray-100 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car Model */}
          <div>
            <label
              htmlFor="model"
              className="block mb-2 text-sm text-text font-medium"
            >
              Car Model
            </label>
            <input
              type="text"
              name="model"
              id="model"
              placeholder="Car Model"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {/* Daily Rental Price */}
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm text-text font-medium"
            >
              Daily Rental Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price per day"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {/* Availability Date */}
          <div>
            <label
              htmlFor="availability"
              className="block mb-2 text-sm text-text font-medium"
            >
              Availability Date
            </label>
            <DatePicker
              selected={availability}
              onChange={(date) => setAvailability(date)}
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholderText="Select Availability Date"
              required
            />
          </div>

          {/* Registration Number */}
          <div>
            <label
              htmlFor="registration"
              className="block mb-2 text-sm text-text font-medium"
            >
              Registration Number
            </label>
            <input
              type="text"
              name="registration"
              id="registration"
              placeholder="Vehicle Registration"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {/* Features */}
          <div>
            <label
              htmlFor="features"
              className="block mb-2 text-sm text-text font-medium"
            >
              Features
            </label>
            <input
              type="text"
              name="features"
              id="features"
              placeholder="e.g., GPS, AC"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm text-text font-medium"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Car Description"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              rows="3"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm text-text font-medium"
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              placeholder="Image URL"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm text-text font-medium"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Car Location"
              className="bg-input border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/80"
          >
            Save Car
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCar;
