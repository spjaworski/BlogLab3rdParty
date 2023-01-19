import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogs from './views/blogs';
import SingleBlog from './views/singleBlog';
import EditBlog from './views/EditBlog';
import CreateBlog from './views/createBlog';

/* HOOK REACT EXAMPLE */
const App = () => {

	return (
		<BrowserRouter>
			<main className='container m-5'>
				<Routes>
					<Route path='/' element={<h1 className='row justify-content-center'>Welcome to the Blogs Lab!</h1>} />
					<Route path='/blogs' element={<Blogs />} />
					<Route path='/blogs/:id' element={<SingleBlog />} />
					<Route path='/blogs/:id/edit' element={<EditBlog />} />
					<Route path='/create' element={<CreateBlog />} />
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
