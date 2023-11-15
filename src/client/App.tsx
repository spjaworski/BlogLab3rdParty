import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './views/blogs';
import SingleBlog from './views/singleBlog';
import EditBlog from './views/EditBlog';
import CreateBlog from './views/createBlog';
import Navbar from "./componets/Navbar";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Donate from './componets/Donate';
import Email from './views/Email';
import Home from './views/Home';
import { apiService } from './services/api-service';
import LoginPage from './componets/LoginPage'
import RegisterPage from './componets/registerPage';
import PrivateRoute from './componets/PrivateRoute';

const stripe = loadStripe('pk_test_51MbCSeEj2tcMm6OrAb8PSterN4lpZeqikm7aw7jSTKOYyL8qitk8aQfUOJgDBpohjOmyoQWdAKNrmo2fIVDS83u800SnpMeDBh');


const App = () => {

	// const handleLogin = async () => {
	// 	try {
	// 		const token = apiService('/auth/login', 'POST', {
	// 			email: 'newTest@test.com',
	// 			password: 'hunter3'
	// 		});
	// 		console.log(token);
	// 	} catch (error) {
	// 		console.log('handleLogin failed');
	// 	}
	// }

	// const [testMess, setTestmess] = useState<{ message: string }>()

	// useEffect(() => {

	// 	const TOKEN = localStorage.getItem('token');

	// 	fetch('/api/homeTest', {
	// 		method: 'GET',
	// 		headers: {
	// 			'Authorization': `Bearer ${TOKEN}`
	// 		}
	// 	})
	// 		.then(res => res.json())
	// 		.then(data => setTestmess(data));
	// }, [])

	return (
		<BrowserRouter>
			<Navbar />
			<main className='container m-5'>
				{/* <button onClick={handleLogin}>Login Test</button> */}
				<Routes>
					{/* <Route path='/' element={<h1 className='row justify-content-center'>{testMess?.message}</h1>} /> */}
					<Route path='/' element={<Home />} />
					<Route path='/blogs' element={<Blogs />} />
					<Route path='/blogs/:id' element={<SingleBlog />} />
					<Route path='/blogs/:id/edit' element={<EditBlog />} />
					<Route path='/create' element={
						<PrivateRoute>
							<CreateBlog />
						</PrivateRoute>} />
					<Route path='/donate' element={
						<Elements stripe={stripe}>
							<Donate />
						</Elements>
					} />
					<Route path='/email' element={<Email />} />
					{/* <Route path='/pizza'
						element={<h1 className='text-center display-1'>Pizza</h1>}
					/> */}
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='*'>
						{() => <h1 className='text-center'>404: Page Not Found</h1>}
					</Route>
				</Routes>
			</main>
		</BrowserRouter>
	)



	// const [greeting, setGreeting] = useState<string>('');

	// useEffect(() => {
	// 	async function getGreeting() {
	// 		try {
	// 			const res = await fetch('/api/hello');
	// 			const greeting = await res.json();
	// 			setGreeting(greeting);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	getGreeting();
	// }, []);

	// return (
	// 	<main className="container my-5">
	// 		<h1 className="text-primary text-center">Hello {greeting}!</h1>
	// 	</main>
	// );
};

interface AppProps { }

/* CLASS REACT EXAMPLE */
// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

export default App;


// https://rufus.ie/en/
// https://ubuntu.com/download/desktop/thank-you?version=22.04.1&architecture=amd64