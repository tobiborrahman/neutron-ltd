import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrUpdate } from 'react-icons/gr';
import UpdateContacts from './UpdateContacts';
import Swal from 'sweetalert2';

const SingleContacts = ({ singleData }) => {
	const { _id } = singleData;
	const [isFavorited, setIsFavorited] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

	const handleToggleFavorite = () => {
		setIsFavorited(!isFavorited);
		fetch(`http://localhost:5000/favorites/${singleData._id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(singleData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.insertedId) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Contact added to the list`,
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};

	const toggleModal = () => {
		setUpdateModalOpen(!isUpdateModalOpen);
	};

	const handleUpdate = () => {
		setUpdateModalOpen(true);
	};

	const handleUpdateSubmit = () => {
		fetch(`http://localhost:5000/contacts/${singleData._id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(singleData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error('Error updating data:', error));
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:5000/contacts/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.deletedCount > 0) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Contact added to the list`,
						showConfirmButton: false,
						timer: 1500,
					});
					reset();
				}
			});
	};

	return (
		<>
			<section>
				<div>
					<div className="px-6 py-10 shadow shadow-gray-200 hover:shadow-lg dark:shadow-gray-800 dark:hover:shadow-gray-700 transition rounded-2xl bg-white dark:bg-slate-900 md:h-[460px] duration-500 text-center">
						<div className="flex justify-center items-center">
							<img
								className="w-[200px] h-[200px] rounded-full"
								src={singleData.photoUrl}
								alt=""
							/>
						</div>
						<h4 className="text-xl dark:text-white py-2 hover:text-[#F59E0B] dark:hover:text-[#F59E0B]">
							{singleData.name}
						</h4>
						<p className="text-md  text-[#94A3B8]">
							{singleData.email}
						</p>
						<p className="text-md py-2 text-[#94A3B8]">
							{singleData.phone}
						</p>
						<p className="text-md  text-[#94A3B8]">
							{singleData.address}
						</p>

						<div className="flex pt-4 justify-center items-center gap-8">
							<button
								onClick={handleToggleFavorite}
								className={`p-[12px] rounded-full ${
									isFavorited ? 'bg-red-500' : 'bg-amber-500'
								} text-white`}
							>
								{isFavorited ? <FaHeart /> : <FaRegHeart />}
							</button>

							<GrUpdate
								onClick={handleUpdate}
								className="w-10 h-10 p-[10px] bg-amber-500 text-white rounded-full"
							/>

							<RiDeleteBin6Line
								onClick={() => handleDelete(_id)}
								className="w-10 h-10 p-[10px] bg-amber-500 text-white rounded-full"
							/>
						</div>
					</div>
				</div>

				{isUpdateModalOpen && (
					<div className="absolute top-[50%] left-[30%] ">
						<div className="">
							<UpdateContacts
								handleUpdateSubmit={handleUpdateSubmit}
								singleData={singleData}
							/>
							<div className="-mt-[160px] mx-10">
								<button
									onClick={() =>
										toggleModal(!isUpdateModalOpen)
									}
									className="py-2 px-6 bg-amber-500 w-full"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default SingleContacts;
