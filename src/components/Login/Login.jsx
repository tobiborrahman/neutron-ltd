import React, { useContext, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
	const { logInUser, handleGoogleSignIn } = useContext(AuthContext);

	const [error, setError] = useState('');

	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || '/';

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		} else {
			setError('');
		}

		logInUser(email, password)
			.then((signedUser) => {
				const loggedUser = signedUser.user;
				console.log(loggedUser);
				form.reset('');
				navigate(from, { replace: true });
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	const handleGooglePopUp = () => {
		handleGoogleSignIn()
			.then((result) => {
				const popUp = result.user;
				navigate(from, { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="flex justify-center items-center py-20">
			<div className="w-[500px]">
				<div className="bg-base-300 shadow-xl text-center rounded">
					<h1 className="text-black text-5xl text-center mt-5 font-semibold">
						Login Now!
					</h1>
					<form onSubmit={handleLogin} className="p-10">
						<div className="form-control">
							<input
								type="email"
								placeholder="Email"
								name="email"
								className="py-2 px-6 border rounded w-full"
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
								<p href="#" className="my-5">
									Don't have an Account?{' '}
									<Link
										className="link link-hover underline"
										to="/sign-up"
									>
										Register
									</Link>
								</p>
							</label>
						</div>

						<div className="mt-3">
							<button className="py-2 px-6 bg-amber-200 w-full rounded font-semibold ">
								{' '}
								Login
							</button>
						</div>
						<p className="text-red-600">{error}</p>
						<p className="text-center">or</p>
						<div className="form-control">
							<button
								onClick={handleGooglePopUp}
								className="flex justify-center items-center w-full bg-amber-300 py-2 rounded"
							>
								{' '}
								<FaGoogle className="mr-3 text-2xl"></FaGoogle>{' '}
								Sign In With Google
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
