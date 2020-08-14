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
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ScoreList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: [],
			loading: false
		};
		this.handleAddQuestion = this.handleAddQuestion.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	handleAddQuestion(a, b) {
		let x = a + b;
		console.log('clicked', x);
		this.setState({ loading: true });
	}

	getData() {
		const userId = this.props.match.params.id;
		const data = { userId: userId };

		return axios.get(baseurl('score/week')).then((response) => {
			console.log(response.data);
			this.setState({ score: response.data });
		});
	}

	render() {
		const { score, loading } = this.state;
		const tooltip = <Tooltip id="button-tooltip">Simple tooltip</Tooltip>;
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
								category="Data pengerjaan minggu ini"
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
															<Form.Control
																type={
																	this.state.searchBy ===
																	'Batch' ? (
																		'number'
																	) : (
																		'text'
																	)
																}
																disabled={
																	this.state.searchBy ===
																	undefined ? (
																		true
																	) : (
																		false
																	)
																}
																placeholder={
																	this.state.searchBy ===
																	undefined ? (
																		''
																	) : (
																		`Masukkan ${this.state
																			.searchBy}`
																	)
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
														<th>NAMA</th>
														<th>QUIZ</th>
														<th>SCORE</th>
														<th>SUBMIT</th>
														<th>STATUS</th>
													</tr>
												</thead>
												<tbody key={1}>
													{score.length < 1 ? (
														<tr>
															<td
																colSpan={6}
																style={{ textAlign: 'center' }}
															>
																NO DATA FOUND
															</td>
														</tr>
													) : (
														score.map((prop, key) => (
															<tr key={key}>
																<td>{prop.userId.fullname}</td>
																<td>{prop.categoryId.category}</td>
																<td>{prop.score}</td>
																<td>
																	{moment(prop.createdAt).format(
																		'DD/MM/YYYY [at] HH:mm:ss'
																	)}
																</td>
																<td
																	style={{
																		color: `${prop.passed
																			? 'blue'
																			: 'red'}`
																	}}
																>
																	{prop.passed ? (
																		'LULUS'
																	) : (
																		'TIDAK LULUS'
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

export default ScoreList;
