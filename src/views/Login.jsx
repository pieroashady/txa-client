import React, { Component } from 'react';
import axios from 'axios';
import { Form, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { login } from 'utils';
import { useHistory } from 'react-router';
import '../assets/css/my.css';
import Parse from 'parse';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hello: '',
			username: '',
			password: '',
			loading: false,
			error: null
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {}

	handleLogin(e) {
		e.preventDefault();
		this.setState({ login: true });
		const url = 'http://35.247.147.177:3001/api/admin/login';
		const creds = {
			username: this.state.username,
			password: this.state.password
		};
		console.log(creds);
		Parse.User
			.logIn(this.state.username, this.state.password)
			.then(({ attributes }) => {
				console.log(attributes);
				if (attributes.role !== 'admin') {
					this.setState({ error: 'not admin' });
					console.log(this.state.error);
					alert(this.state.error);
					return;
				}
				login();
				// console.log(x.data);
				// localStorage.setItem('sessionToken', x.data.sessionToken);
				// localStorage.setItem('userInfo', x.data);
				this.props.history.push('/admin/dashboard');
				this.setState({ login: false });
			})
			.catch((error) => {
				this.setState({ error: error.message });
				console.log(this.state.error);
				alert(this.state.error);
				return;
			});

		// return axios
		// 	.post(url, creds)
		// 	.then((x) => {
		// 		if (x.data.code === 101) {
		// 			this.setState({ error: x.data.message });
		// 			console.log(this.state.error);
		// 			alert(this.state.error);
		// 			return;
		// 		} else if (x.data.status === 0) {
		// 			this.setState({ error: x.data.message });
		// 			console.log(this.state.error);
		// 			alert(this.state.error);
		// 			return;
		// 		} else {
		// 			login();
		// 			console.log(x.data);
		// 			localStorage.setItem('sessionToken', x.data.sessionToken);
		// 			localStorage.setItem('userInfo', x.data);
		// 			this.props.history.push('/admin/dashboard');
		// 			this.setState({ login: false });
		// 		}
		// 		// return useHistory().push('/admin/table');
		// 	})
		// 	.catch((err) => {
		// 		console.log('gagal');
		// 		this.setState({ login: false, error: err });
		// 		console.log(err);
		// 	});
	}

	getHelloWorld() {
		const url = 'http://35.247.147.177:3001/hello';
		axios.get(url).then(({ data }) => {
			this.setState({ hello: data });
		});
	}
	render() {
		const { hello, loading, error } = this.state;

		return (
			<div className="containerz">
				<div className="login">
					<p style={{ textAlign: 'center', fontWeight: 'bolder' }}>
						{error ? error : 'Login First'}
					</p>
					<Form onSubmit={this.handleLogin}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								onChange={(e) => {
									this.setState({ username: e.target.value });
								}}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(e) => {
									this.setState({ password: e.target.value });
								}}
							/>
						</Form.Group>
						<Button variant="primary" type="submit" disabled={loading ? true : false}>
							{loading ? (
								<Spinner
									as="span"
									animation="grow"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							) : (
								'Login'
							)}
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default Login;
