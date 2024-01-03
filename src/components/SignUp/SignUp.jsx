import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const SignUp = () => {
	const { createUser, userNameUrl, logOut } = useContext(AuthContext);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleRegister = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const photoUrl = form.photoUrl.value;
		const email = form.email.value;
		const password = form.password.value;

		console.log(name, photoUrl, email, password);

		if (password.length < 6) {
			setError('Password must be at least six characters');
			return;
		} else if (!password) {
			setError('Password did not match');
			return;
		} else if (!email) {
			setError('Email did not match');
			return;
		}

		createUser(email, password)
			.then((createdUser) => {
				const newUser = createdUser.user;
				console.log(newUser);
				form.reset('');
				userNameUrl();
				logOut();
				navigate('/login');
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div className="flex justify-center items-center py-20">
			<div className="w-[500px]">
				<div className="bg-base-300 shadow-xl text-center rounded">
					<h1 className="text-black text-5xl text-center mt-5 font-semibold">
						Register Now!
					</h1>
					<form onSubmit={handleRegister} className="p-10">
						<div className="form-control">
							<input
								type="text"
								placeholder="Name"
								name="name"
								className="py-2 px-6 border rounded w-full"
							/>
						</div>
						<div className="form-control">
							<input
								type="url"
								placeholder="photoUrl"
								name="photoUrl"
								className="py-2 px-6 border mt-4 rounded w-full"
							/>
						</div>
						<div className="form-control">
							<input
								type="email"
								placeholder="Email"
								name="email"
								className="py-2 px-6 border mt-4 rounded w-full"
								required
							/>
						</div>
						<div className="form-control">
							<input
								type="password"
								placeholder="Password"
								name="password"
								className="py-2 px-6 border mt-4 rounded w-full"
								required
							/>
							<label className="label">
								<p href="#" className="label-text-alt my-3">
									Already have an Account?{' '}
									<Link
										className="link link-hover underline"
										to="/login"
									>
										login
									</Link>
								</p>
							</label>
							{error && (
								<p className="text-1xl text-red-700">{error}</p>
							)}
						</div>
						<div className="form-control mt-6">
							<button className="py-2 px-6 bg-amber-200 w-full rounded font-semibold ">
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
