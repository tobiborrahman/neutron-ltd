import React, { useEffect, useState } from 'react';
import SingleContacts from './SingleContacts';

const AllContacts = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('https://neutron-ltd-server.vercel.app/contacts')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setData(data);
			});
	}, []);

	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 pt-8 gap-[30px] px-3 md:px-20 py-10 md:py-20 bg-[#F9FAFB]">
			{data.map((singleData) => (
				<SingleContacts
					key={singleData.id}
					singleData={singleData}
				></SingleContacts>
			))}
		</div>
	);
};

export default AllContacts;
