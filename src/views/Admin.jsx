/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	Form,
	Tooltip,
	OverlayTrigger
} from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import { UserCard } from 'components/UserCard/UserCard.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

import avatar from 'assets/img/faces/face-3.jpg';
import Axios from 'axios';
import { baseurl } from 'utils/baseurl';
import Parse from 'parse';
import ModalHandler from './Category/ModalHandler';
import moment from 'moment';
import DateTime from 'react-datetime';
import { Link } from 'react-router-dom';
import * as env from '../env';

Parse.initialize(env.APPLICATION_ID, env.JAVASCRIPT_KEY);
Parse.masterKey = env.MASTER_KEY;
Parse.serverURL = env.SERVER_URL;

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trainee: [],
			error: '',
			batch: 1,
			username: '',
			email: '',
			dob: moment(),
			pob: '',
			phoneNumber: '',
			fullname: '',
			password: '',
			passwordConf: '',
			profile: '',
			error: '',
			fullnames: '',
			traineeId: '',
			loading: false,
			addMode: false,
			editMode: false,
			deleteMode: false,
			buttonLoading: false,
			newDob: '',
			allTrainee: 0,
			searchBy: '',
			searchValue: ''
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	componentDidMount() {
		this.getTrainee();
		this.getAllTraine();
	}

	getAllTraine() {
		const User = new Parse.User();
		const query = new Parse.Query(User);

		query.equalTo('role', 'admin');
		query
			.count()
			.then((x) => {
				console.log('x', x);
				this.setState({ allTrainee: x });
			})
			.catch((err) => {
				alert(err.message);
			});
	}

	getTrainee() {
		this.setState({ loading: true });

		const query = new Parse.Query(Parse.User);
		query.equalTo('role', 'admin');
		// query.equalTo('batch', this.state.batch);
		// //console.log(req.body.batch);
		// query.ascending('batch');
		query.ascending('fullname');
		query
			.find()
			.then((x) => {
				this.setState({ trainee: x, loading: false });
			})
			.catch((err) => {
				alert(err.message);
				this.setState({ loading: false });
			});
	}

	handleAdd(e) {
		e.preventDefault();
		this.setState({ loading: true });
		const {
			username,
			email,
			password,
			passwordConf,
			dob,
			pob,
			phoneNumber,
			fullname,
			batch,
			profile,
			newDob
		} = this.state;

		//		let newBatch = this.state.batch;
		let totalTrainee = this.state.allTrainee + 1;

		if (totalTrainee < 10) {
			totalTrainee = `0${totalTrainee}`;
		}

		console.log('newDob', newDob);
		console.log('totalTrainee', totalTrainee);

		const user = new Parse.User();
		user.set('username', `${username}`);
		user.set('email', email);
		if (profile !== '') user.set('profile', new Parse.File('profile.jpg', profile));
		user.set('dateOfBirth', dob);
		user.set('placeOfBirth', pob);
		user.set('phoneNumber', phoneNumber);
		user.set('role', 'admin');
		user.set('fullname', fullname);
		user.set('status', 1);
		user.set('password', password);
		user.set('out', false);
		user.set('kodeTrainee', `admin-${totalTrainee}`);
		user
			.save()
			.then((x) => {
				console.log('data', x);
				this.setState({
					addMode: false,
					loading: false
				});
				window.location.reload(false);
			})
			.catch((err) => {
				alert(err.message);
				this.setState({ loading: false });
			});
	}

	handleEdit(id) {
		const User = new Parse.User();
		const query = new Parse.Query(User);

		// Finds the user by its ID
		query
			.get(id)
			.then((user) => {
				console.log(user);
				// Updates the data we want
				this.setState({
					traineeId: id,
					editMode: true,
					username: user.get('username'),
					email: user.get('email'),
					dob: user.get('dateOfBirth'),
					pob: user.get('placeOfBirth'),
					phoneNumber: user.get('phoneNumber'),
					fullname: user.get('fullname')
				});
			})
			.catch((err) => console.log(err));
	}

	handleUpdate(e) {
		e.preventDefault();
		const token = localStorage.getItem('sessionToken');
		this.setState({ loading: true });

		const {
			username,
			email,
			password,
			passwordConf,
			dob,
			pob,
			phoneNumber,
			fullname,
			batch,
			profile
		} = this.state;

		const userx = Parse.User.current();
		console.log('user', userx.get('sessionToken'));

		const User = new Parse.User();
		const query = new Parse.Query(User);
		query
			.get(this.state.traineeId)
			.then((user) => {
				console.log(user);
				user.set('username', `${username}`);
				user.set('email', email);
				if (profile !== '') user.set('profile', new Parse.File('profile.jpg', profile));
				user.set('dateOfBirth', dob);
				user.set('placeOfBirth', pob);
				user.set('phoneNumber', phoneNumber);
				user.set('role', 'admin');
				user.set('fullname', fullname);
				user.set('status', 1);
				//user.set('password', password);
				user.set('out', false);
				user
					.save(null, {
						useMasterKey: true
						// sessionToken: userx.get('sessionToken')
					})
					.then((z) => {
						this.setState({ loading: false });
						window.location.reload(false);
					})
					.catch((error) => console.log(error.message));
			})
			.catch((error) => console.log(error.message));
	}

	kodeTrainee = () => {
		const { batch, dob } = this.state;
		const convertDob = moment(dob).format('DDMMYYY');
		let totalTrainee = 0;
		let newBatch = '';
		let newTotalTrainee = '';
		let kode = '';

		const User = new Parse.User();
		const query = new Parse.Query(User);

		query
			.count()
			.then((x) => {
				totalTrainee = x + 1;

				if (batch < 10) {
					batch = `0${batch}`;
				}

				if (totalTrainee < 10) {
					totalTrainee = `0${totalTrainee}`;
				}

				kode = `${batch}${convertDob}${totalTrainee}`;
				return kode;
			})
			.catch((err) => {
				alert('Something went wrong');
			});
	};

	handleDelete() {
		this.setState({ loading: true });
		const User = new Parse.User();
		const query = new Parse.Query(User);

		query.get(this.state.traineeId).then((x) => {
			x.set('status', 0);
			x.save(null, { useMasterKey: true }).then((z) => {
				this.setState({ loading: false });
				window.location.reload(false);
			});
		});
	}

	handleFilter(e) {
		e.preventDefault();
		this.setState({ loading: true });
		const { searchBy, searchValue } = this.state;
		const User = new Parse.User();
		const query = new Parse.Query(User);
		query.equalTo('role', 'admin');

		switch (searchBy) {
			case 'Kode Admin':
				query.equalTo('kodeTrainee', searchValue);
				query.ascending('fullname');
				query
					.find()
					.then((x) => {
						this.setState({ trainee: x, loading: false });
					})
					.catch((err) => {
						alert(err.message);
						this.setState({ loading: false });
					});
				break;
			case 'Nama':
				query.matches('fullname', searchValue, 'i');
				query.ascending('fullname');
				query
					.find()
					.then((x) => {
						this.setState({ trainee: x, loading: false });
					})
					.catch((err) => {
						alert(err.message);
						this.setState({ loading: false });
					});
				break;

			default:
				break;
		}
	}

	handleSearch(e) {
		e.preventDefault();

		console.log(this.state.batch);

		this.setState({ loading: true });

		const data = {
			batch: this.state.batch
		};

		Axios.post(baseurl('trainee/batch'), data)
			.then((x) => {
				console.log(x.data);
				this.setState({ trainee: x.data, loading: false });
			})
			.catch((err) => this.setState({ error: err, loading: false }));
	}

	render() {
		const { trainee, error, loading, batch } = this.state;
		const {
			username,
			email,
			password,
			passwordConf,
			dob,
			pob,
			phoneNumber,
			fullname,
			profile
		} = this.state;
		const tooltip = (msg) => <Tooltip id="button-tooltip">{msg}</Tooltip>;
		const textForm = (
			<Form.Control
				type={this.state.searchBy === 'Batch' ? 'number' : 'text'}
				disabled={this.state.searchBy === '' ? true : false}
				placeholder={this.state.searchBy === '' ? '' : `Masukkan ${this.state.searchBy}`}
				//value={startDate}
				onChange={(e) => {
					console.log(e.target.value);
					this.setState({
						searchValue: e.target.value
					});
				}}
				required="true"
			/>
		);

		const selectForm = (
			<Form.Control
				as="select"
				// defaultValue={1}
				onChange={(e) => {
					console.log(e.target.value);
					this.setState({
						searchValue: e.target.value
					});
				}}
				required="true"
			>
				<option value="">Pilih Status</option>
				{[ 'Aktif', 'Tidak aktif' ].map((x) => (
					<option value={x == 'Aktif' ? 1 : 0}>{x}</option>
				))}
			</Form.Control>
		);

		return (
			<div className="content">
				<ModalHandler
					show={this.state.deleteMode}
					title="Delete confirmation"
					handleHide={() => this.setState({ deleteMode: false })}
					handleSave={this.handleDelete}
					body={'Delete trainee ' + this.state.fullnames + ' ?'}
				/>
				<ModalHandler
					show={this.state.editMode}
					title="Edit content"
					handleHide={() => this.setState({ editMode: false })}
					body={
						<Form onSubmit={this.handleUpdate}>
							<Form.Group controlId="formCategory">
								<Form.Label>Fullname</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									value={fullname}
									type="text"
									placeholder="Enter fullname"
									onChange={(e) => this.setState({ fullname: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId="formCategory">
								<Form.Label>Username</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									value={username}
									type="text"
									placeholder="Enter fullname"
									onChange={(e) => this.setState({ username: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId="formSubtitle">
								<Form.Label>Email</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									value={email}
									type="email"
									placeholder="Enter email"
									onChange={(e) => this.setState({ email: e.target.value })}
								/>
							</Form.Group>

							<Form.Group>
								<Form.File
									id="exampleFormControlFile1"
									label="Trainee picture"
									onChange={(e) => {
										this.setState({ profile: e.target.files[0] });
										console.log(e.target.files[0]);
									}}
								/>
							</Form.Group>

							<Form.Group controlId="formCategory">
								<Form.Label>Tempat lahir</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									value={pob}
									type="text"
									placeholder="Tempat lahir"
									onChange={(e) => this.setState({ pob: e.target.value })}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Tanggal lahir</Form.Label>
								<DateTime
									timeFormat={false}
									value={this.state.dob}
									onChange={(momentz) => {
										console.log(momentz.toDate());
										this.setState({
											dob: momentz.format('DD/MM/YYYY')
										});
									}}
									inputProps={{
										placeholder: 'Select date',
										readOnly: true
									}}
								/>
							</Form.Group>

							<Form.Group controlId="formPhone">
								<Form.Label>Phone number</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									type="number"
									value={phoneNumber}
									placeholder="Nomor telfon"
									onChange={(e) => this.setState({ phoneNumber: e.target.value })}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								{this.state.loading ? 'Processing...' : 'Submit'}
							</Button>
						</Form>
					}
				/>
				<ModalHandler
					show={this.state.addMode}
					title="Add Admin"
					handleHide={() => this.setState({ addMode: false })}
					body={
						<Form onSubmit={this.handleAdd}>
							<Form.Group controlId="formCategory">
								<Form.Label>Fullname</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									type="text"
									placeholder="Enter fullname"
									onChange={(e) => this.setState({ fullname: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId="formCategoryxx">
								<Form.Label>Username</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									type="text"
									placeholder="Enter fullname"
									onChange={(e) => this.setState({ username: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId="formSubtitle">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									onChange={(e) => this.setState({ email: e.target.value })}
								/>
							</Form.Group>

							<Form.Group controlId="formPasw">
								<Form.Label>Password</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									type="text"
									placeholder="Enter password"
									onChange={(e) => this.setState({ password: e.target.value })}
								/>
							</Form.Group>

							<Form.Group>
								<Form.File
									id="exampleFormControlFile1"
									label="Trainee picture"
									onChange={(e) => {
										this.setState({ profile: e.target.files[0] });
										console.log(e.target.files[0]);
									}}
								/>
							</Form.Group>

							<Form.Group controlId="formCategory">
								<Form.Label>Tempat lahir</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									type="text"
									placeholder="Tempat lahir"
									onChange={(e) => this.setState({ pob: e.target.value })}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Tanggal lahir</Form.Label>
								<DateTime
									timeFormat={false}
									value={this.state.dob}
									onChange={(momentz) => {
										console.log(momentz.toDate());
										this.setState({
											dob: momentz.format('DD/MM/YYYY'),
											newDob: momentz.format('DDMMYYYY')
										});
									}}
									inputProps={{
										placeholder: 'Select date',
										readOnly: true
									}}
								/>
							</Form.Group>

							<Form.Group controlId="formPhone">
								<Form.Label>Phone number</Form.Label>
								<Form.Control
									autoCapitalize="true"
									autoComplete="false"
									type="number"
									//value={1}
									placeholder="Nomor telfon"
									onChange={(e) => this.setState({ phoneNumber: e.target.value })}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								{this.state.loading ? 'Processing...' : 'Submit'}
							</Button>
						</Form>
					}
				/>
				<Container fluid>
					<Row>
						<Col md={12}>
							<Card
								title={
									<Button
										variant="primary"
										style={{ margin: '0px' }}
										onClick={() => this.setState({ addMode: true })}
									>
										<i className="fa fa-plus" /> Add Admin
									</Button>
								}
								content={
									<div>
										<Row>
											<Col>
												<Form onSubmit={this.handleFilter}>
													<Form.Group
														as={Row}
														controlId={'formHorizontalEmail'}
													>
														<Col
															sm={{ span: 4 }}
															className="pull-right"
														>
															<Form.Control
																as="select"
																// defaultValue={1}
																onChange={(e) => {
																	console.log(e.target.value);
																	this.setState({
																		searchBy: e.target.value
																	});
																}}
																required="true"
															>
																<option value="">
																	Cari berdasarkan
																</option>
																{[
																	'Kode Admin',
																	'Nama'
																].map((x) => (
																	<option value={x}>{x}</option>
																))}
															</Form.Control>
														</Col>
														<Col
															sm={{ span: 6 }}
															className="pull-right"
														>
															{this.state.searchBy === 'Status' ? (
																selectForm
															) : (
																textForm
															)}
														</Col>
														{/* <Col sm={{ span: 3 }} className="pull-right">
														<Form.Control
															type="date"
															value={endDate}
															onChange={(e) => {
																this.setState({ endDate: e.target.value })
															}}
															required
														/>
													</Col> */}
														<Button
															variant="primary"
															type="submit"
															disable={loading ? 'true' : 'false'}
															className="mr-2 m-1"
															// onClick={this.handleFilterCalendar}
														>
															<i className="fa fa-search" />{' '}
															{loading ? 'Fetching...' : 'Search'}
														</Button>
													</Form.Group>
												</Form>
											</Col>
										</Row>
										<Row>
											{trainee.length < 1 ? (
												<Col md={12}>No data found...</Col>
											) : (
												trainee.map((x, i) => (
													<Col md={3}>
														<UserCard
															out={x.get('status')}
															bgImage={
																<img
																	src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
																	alt="..."
																/>
															}
															avatar={x.get('profile').url()}
															name={x.get('fullname')}
															userName={x.get('username')}
															description={
																<span>
																	{x.get('dateOfBirth')}
																	<br />
																	{x.get('placeOfBirth')}
																	<br />
																	{x.get('phoneNumber')}
																</span>
															}
															socials={
																<div>
																	<OverlayTrigger
																		placement="right"
																		overlay={tooltip(
																			'Lihat pengerjaan quiz'
																		)}
																	>
																		<Link
																			to={`/admin/quiz/${x.id}`}
																		>
																			<Button simple>
																				<i className="fa fa-eye" />
																			</Button>
																		</Link>
																	</OverlayTrigger>
																	<OverlayTrigger
																		placement="right"
																		overlay={tooltip(
																			'Edit data'
																		)}
																	>
																		<Button
																			simple
																			onClick={() => {
																				this.handleEdit(
																					x.id
																				);
																			}}
																		>
																			<i className="fa fa-pencil-square-o" />
																		</Button>
																	</OverlayTrigger>
																	<OverlayTrigger
																		placement="right"
																		overlay={tooltip(
																			'Hapus data'
																		)}
																	>
																		<Button
																			simple
																			onClick={(e) => {
																				this.setState({
																					deleteMode: true,
																					fullnames: x.get(
																						'fullname'
																					),
																					traineeId: x.id,
																					traineeIndex: i
																				});
																			}}
																		>
																			<i className="fa fa-trash" />
																		</Button>
																	</OverlayTrigger>
																</div>
															}
														/>
													</Col>
												))
											)}
										</Row>
									</div>
								}
							/>
						</Col>
					</Row>

					{/* </Col> */}
					{/* </Row> */}
				</Container>
			</div>
		);
	}
}

export default Admin;
