import React, { createContext, useEffect, useState } from 'react';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import app from '../../firebase.config';

export const AuthContext = createContext('');
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const provider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const handleGoogleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const handleGithubLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, githubProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const userNameUrl = () => {
		return updateProfile(auth.currentUser, {
			displayName: 'Tobibor Rahman',
			photoURL:
				'https://lh3.googleusercontent.com/a/AGNmyxZgyL3PS2oCamfX0u4pCT6mz3TBGaBaUZbUFxaF=s96-c',
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
			setUser(loggedUser);
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		logOut,
		createUser,
		logInUser,
		userNameUrl,
		handleGoogleSignIn,
		handleGithubLogin,
	};
	return (
		<div>
			<AuthContext.Provider value={authInfo}>
				{children}
			</AuthContext.Provider>
		</div>
	);
};

export default AuthProvider;
