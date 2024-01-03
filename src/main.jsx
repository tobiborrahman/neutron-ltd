import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AllContacts from './components/AllContacts/AllContacts.jsx';
import AddContacts from './components/AddContacts/AddContacts.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import UpdateContacts from './components/AllContacts/UpdateContacts.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		children: [
			{
				path: '/',
				element: <AllContacts />,
			},
			{
				path: '/login',
				element: <Login />,
			},

			{
				path: '/add-contacts',
				element: <AddContacts />,
			},
			{
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/contacts/:id',
				element: <UpdateContacts />,
				loader: ({ params }) =>
					fetch(
						`https://neutron-ltd-server.vercel.app/contacts/${params.id}`
					),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
