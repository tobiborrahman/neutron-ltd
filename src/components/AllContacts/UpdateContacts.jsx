import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddContacts = ({ singleData }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		fetch(
			`https://neutron-ltd-server.vercel.app/contacts/${singleData._id}`,
			{
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: `Contact modified successfully`,
						showConfirmButton: false,
						timer: 1500,
					});
					reset();
				}
			});
	};

	return (
		<div className="flex justify-center items-center my-32 bg-[#61707D] shadow rounded-xl pb-12 z-90">
			<form className="w-[500px] p-10 " onSubmit={handleSubmit(onSubmit)}>
				<h1 className="text-center text-white text-4xl font-bold pb-10">
					Update Contact Details
				</h1>

				<input
					type="text"
					className="border py-2 w-full mb-3 pl-3"
					placeholder="Name"
					{...register('name', {
						required: true,
						maxLength: 80,
					})}
				/>
				<br />
				<input
					type="email"
					className="border py-2 w-full mb-3 pl-3"
					placeholder="Email"
					{...register('email', {
						required: true,
					})}
				/>
				<br />
				<input
					type="number"
					className="border py-2 w-full mb-3 pl-3"
					placeholder="Phone Number"
					{...register('phone', {})}
				/>

				<input
					type="text"
					className="border py-2 w-full mb-3 pl-3"
					placeholder="Address"
					{...register('address', {})}
				/>

				<input
					type="url"
					className="border py-2 w-full pl-3"
					placeholder="photoURL"
					{...register('photoUrl', {
						required: true,
					})}
				/>

				<input
					className="py-2 px-6 w-full text-white duration-700 font-semibold hover:text-[#0C4B65] hover:bg-[#EFCF4F] bg-[#0C4B65] mt-3 "
					type="submit"
					value="Update Contact"
				/>
			</form>
		</div>
	);
};

export default AddContacts;
