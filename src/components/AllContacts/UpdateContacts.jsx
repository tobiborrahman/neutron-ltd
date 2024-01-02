// UpdateModal.js
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateContacts = ({ isOpen, onClose, onUpdate, initialData }) => {
	const [formData, setFormData] = useState(initialData);
	// const data = useLoaderData();
	// console.log(data);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex justify-center items-center">
			<div
				className={`modal ${
					isOpen ? 'block' : 'hidden'
				} w-[500px] h-[300px]`}
			>
				<div
					className="modal-overlay absolute w-full h-full bg-gray-800 opacity-50 z-50"
					onClick={onClose}
				></div>
				<div className="modal-container relative bg-white w-96 mx-auto mt-20 p-4 z-100 rounded shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-semibold">
							Update Contact
						</h2>
						<button className="text-gray-500" onClick={onClose}>
							Close
						</button>
					</div>
					<form onSubmit={(e) => onUpdate(e, formData)}>
						{/* Add input fields for updating data */}
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="mb-2 p-2 border border-gray-300 rounded w-full"
							placeholder="Name"
						/>
						<input
							type="text"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="mb-2 p-2 border border-gray-300 rounded w-full"
							placeholder="Email"
						/>
						<input
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className="mb-2 p-2 border border-gray-300 rounded w-full"
							placeholder="Phone"
						/>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							className="mb-2 p-2 border border-gray-300 rounded w-full"
							placeholder="Address"
						/>
						{/* Add more input fields as needed */}
						<button
							type="submit"
							className="bg-blue-500 text-white py-2 px-4 rounded"
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateContacts;
