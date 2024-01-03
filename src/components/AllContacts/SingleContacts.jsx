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
		fetch(
			`https://neutron-ltd-server.vercel.app/favorites/${singleData._id}`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(singleData),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.insertedId) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Contact added to the favorite list`,
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
		fetch(
			`https://neutron-ltd-server.vercel.app/contacts/${singleData._id}`,
			{
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(singleData),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => console.error('Error updating data:', error));
	};

	const handleDelete = (id) => {
		fetch(`https://neutron-ltd-server.vercel.app/contacts/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.deletedCount > 0) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Contact deleted successfully`,
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

						<div className="flex pt-4 justify-center items-center relative gap-8">
							<button
								onClick={handleToggleFavorite}
								className={`p-[12px] rounded-full ${
									isFavorited
										? 'bg-red-500'
										: 'bg-amber-500 hover:bg-amber-500/20 hover:text-amber-500 duration-300'
								} text-white`}
							>
								{isFavorited ? <FaHeart /> : <FaRegHeart />}
							</button>

							<div>
								<GrUpdate
									onClick={handleUpdate}
									className="w-10 h-10 p-[10px] cursor-pointer bg-amber-500 hover:bg-amber-500/20 hover:text-amber-500 duration-300 text-white rounded-full"
								/>

								{isUpdateModalOpen && (
									<div className="absolute top-[-800%] md:top-[-900%] left[-1200%] md:left-[-35%] z-50">
										<div className="">
											<UpdateContacts
												handleUpdateSubmit={
													handleUpdateSubmit
												}
												singleData={singleData}
											/>
											<div className="-mt-[200px] mx-10">
												<button
													onClick={() =>
														toggleModal(
															!isUpdateModalOpen
														)
													}
													className="py-2 px-6 text-white font-semibold bg-amber-500 w-full"
												>
													Cancel
												</button>
											</div>
										</div>
									</div>
								)}
							</div>

							<RiDeleteBin6Line
								onClick={() => handleDelete(_id)}
								className="w-10 h-10 p-[10px] cursor-pointer bg-amber-500 hover:bg-amber-500/20 hover:text-amber-500 duration-300 text-white rounded-full"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SingleContacts;
