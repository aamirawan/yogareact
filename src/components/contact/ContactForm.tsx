import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
  saveInfo: boolean;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    saveInfo: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, saveInfo: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
      </div>
      
      <div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-md h-32"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="saveInfo"
          checked={formData.saveInfo}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor="saveInfo" className="text-sm text-gray-600">
          Save my name, email, and website in this browser for the next time I comment.
        </label>
      </div>
      
      <button 
        type="submit" 
        className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800"
      >
        Submit Now
      </button>
    </form>
  );
};

export default ContactForm;
