import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-[#3b4751]">
			<div className="container mx-auto py-8 px-4">
				<div className="text-center md:text-left md:flex flex-wrap justify-between md:pl-16">
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
						<h4 className="text-white text-2xl md:text-lg font-semibold mb-4">
							About Us
						</h4>
						<p className="text-gray-400 leading-loose">
							At NeutronLTD, we are passionate about creating new
							technologies and websites that will delight your
							taste buds.
						</p>
					</div>
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8  pl-32 md:mb-0">
						<img
							className="w-20 h-20 rounded-lg"
							src="/logo.png"
							alt=""
						/>
					</div>
					<div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
						<h4 className="text-white text-2xl md:text-lg font-semibold mb-4">
							Follow Us
						</h4>

						<div className="flex md:block justify-center items-center">
							<div className="flex">
								<a className="mr-4 text-3xl text-gray-400 hover:text-white">
									<FaFacebook />
								</a>
								<a className="mr-4 text-3xl text-gray-400 hover:text-white">
									<FaInstagram />
								</a>
								<a className="mr-4 text-3xl text-gray-400 hover:text-white">
									<FaTwitter />
								</a>
								<a className="mr-4 text-3xl text-gray-400 hover:text-white">
									<FaYoutube />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-8 text-center">
					<p className="text-gray-400">
						&copy; {new Date().getFullYear()} NeutronLTD. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
