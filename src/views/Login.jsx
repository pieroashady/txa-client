import React, { Component } from 'react';
import axios from 'axios';
import { Form, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { login } from 'utils';
import { useHistory } from 'react-router';
import '../assets/css/my.css';

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
		const url = 'http://localhost:5000/api/login';
		const creds = {
			username: this.state.username,
			password: this.state.password
		};
		console.log(creds);
		return axios
			.post(url, creds)
			.then((x) => {
				if (x.data.code === 101) {
					this.setState({ error: x.data.message });
					console.log(this.state.error);
					alert(this.state.error);
					return;
				} else {
					login();
					console.log(x.data);
					localStorage.setItem('sessionToken', x.data.sessionToken);
					localStorage.setItem('userInfo', x.data);
					this.props.history.push('/admin/category');
					this.setState({ login: false });
				}
				// return useHistory().push('/admin/table');
			})
			.catch((err) => {
				console.log('gagal');
				this.setState({ login: false });
				console.log(err);
			});
	}

	getHelloWorld() {
		const url = 'http://localhost:5000/hello';
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
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email"
								onChange={(e) => {
									console.log(this.state.username);
									console.log(e.target);
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
									console.log(this.state.password);
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
