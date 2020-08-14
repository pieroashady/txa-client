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
import axios from 'axios';
import { Container, Row, Col, Table, Tooltip, Button, OverlayTrigger, Form } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { thArray, tdArray } from 'variables/Variables.jsx';
import { Link } from 'react-router-dom';
import { baseurl } from 'utils/baseurl';
import moment from 'moment';
import Parse from 'parse';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class MasterReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trainee: [],
			loading: false,
			searchValue: ''
		};
		this.handleAddQuestion = this.handleAddQuestion.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	handleAddQuestion(a, b) {
		let x = a + b;
		console.log('clicked', x);
		this.setState({ loading: true });
	}

	handleFilter(e) {
		e.preventDefault();
		this.setState({ loading: true });
		const { searchBy, searchValue } = this.state;
		const User = new Parse.User();
		const query = new Parse.Query(User);

		switch (searchBy) {
			case 'Nomor Induk':
				query.notEqualTo('batch', 0);
				query.equalTo('kodeTrainee', searchValue);
				query.ascending('batch');
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
				query.notEqualTo('batch', 0);
				query.matches('fullname', searchValue, 'i');
				query.ascending('batch');
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
			case 'Batch':
				query.notEqualTo('batch', 0);
				query.equalTo('batch', parseInt(searchValue));
				query.ascending('batch');
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
			case 'Status':
				query.notEqualTo('batch', 0);
				query.equalTo('status', parseInt(searchValue));
				query.ascending('batch');
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

	getData() {
		this.setState({ loading: true });
		const User = new Parse.User();
		const query = new Parse.Query(User);

		query.notEqualTo('batch', 0);
		query.ascending('batch');
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

	render() {
		const { trainee, loading } = this.state;
		const tooltip = <Tooltip id="button-tooltip">Simple tooltip</Tooltip>;
		const textForm = (
			<Form.Control
				type={this.state.searchBy === 'Batch' ? 'number' : 'text'}
				disabled={this.state.searchBy === undefined ? true : false}
				placeholder={
					this.state.searchBy === undefined ? '' : `Masukkan ${this.state.searchBy}`
				}
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
				<Container fluid>
					<Row>
						<Col md={12}>
							<Card
								title={
									<ReactHTMLTableToExcel
										id="eskport"
										className="btn btn-primary"
										table="ekspor"
										filename="tablexls"
										sheet="tablexls"
										buttonText="Ekspor"
									/>
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
																	'Nomor Induk',
																	'Nama',
																	'Batch',
																	'Status'
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
											<Table striped hover id="ekspor">
												<thead>
													<tr>
														<th>NO INDUK</th>
														<th>NAMA LENGKAP</th>
														<th>TEMPAT / TANGGAL LAHIR</th>
														<th>BATCH</th>
														<th>STATUS</th>
													</tr>
												</thead>
												<tbody key={1}>
													{trainee.length < 1 ? (
														<tr>
															<td
																colSpan={6}
																style={{ textAlign: 'center' }}
															>
																NO DATA FOUND
															</td>
														</tr>
													) : (
														trainee.map((prop, key) => (
															<tr key={key}>
																<td>{prop.get('kodeTrainee')}</td>
																<td>{prop.get('fullname')}</td>
																<td>
																	{prop.get('placeOfBirth') +
																		', ' +
																		prop.get('dateOfBirth')}
																</td>
																<td>{prop.get('batch')}</td>
																<td
																	style={{
																		color: `${prop.get(
																			'status'
																		) === 1
																			? 'blue'
																			: 'red'}`
																	}}
																>
																	{prop.get('status') === 1 ? (
																		'AKTIF'
																	) : (
																		'TIDAK AKTIF'
																	)}
																</td>
															</tr>
														))
													)}
												</tbody>
											</Table>
										</Row>
									</div>
								}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default MasterReport;
