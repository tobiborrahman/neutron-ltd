import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

import { CiMenuFries } from 'react-icons/ci';
import { TfiClose } from 'react-icons/tfi';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	const location = useLocation();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleToggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogOut = () => [
		logOut()
			.then(() => {})
			.catch((err) => console.log(err)),
	];
	return (
		<div className="text-center md:flex md:items-center justify-between bg-[#61707D] py-7 px-4 md:px-10">
			<div className="flex justify-between items-center mb-4 md:mb-0">
				<h2 className="text-4xl text-white font-bold mr-4">
					Neutron
					<span className="text-amber-500 font-bold">LTD</span>
				</h2>
				<button
					onClick={handleToggleMenu}
					className="text-3xl md:hidden text-white focus:outline-none"
				>
					{isMenuOpen ? (
						<TfiClose />
					) : (
						<CiMenuFries className="text-4xl" />
					)}
				</button>
			</div>
			<div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
				<nav className="md:flex no-underline md:gap-5 list-none pt-2">
					<li className="text-2xl text-amber-500">
						<Link
							className={
								location.pathname === '/' ? 'active' : ''
							}
							to="/"
						>
							All Contacts
						</Link>
					</li>
					<li className="text-2xl text-amber-500">
						<Link
							className={
								location.pathname === '/add-contacts'
									? 'active'
									: ''
							}
							to="/add-contacts"
						>
							Add Contacts
						</Link>
					</li>

					<li className="text-2xl md:hidden text-amber-500">
						<Link
							className={
								location.pathname === '/login' ? 'active' : ''
							}
							to="/login"
						>
							{user ? 'Log Out' : 'Log In'}
						</Link>
					</li>
				</nav>
			</div>
			<div className="hidden md:flex flex-col md:flex-row items-center">
				{user ? (
					<button
						onClick={handleLogOut}
						className="py-3 px-4 md:px-7 text-1xl text-white font-bold bg-amber-500 mr-2 md:mr-6  duration-300"
					>
						<Link to="/login">Log Out</Link>
					</button>
				) : (
					<button className="py-3 px-4 md:px-7 text-1xl font-bold bg-amber-500  duration-300 mr-2 md:mr-6">
						<Link to="/login">Log In</Link>
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
