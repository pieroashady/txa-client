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
import Dashboard from 'views/Dashboard.jsx';
import UserProfile from 'views/MasterReport.jsx';
import MasterCategory from 'views/Category/MasterCategory';
import QuizList from 'views/Category/QuizList';
import MasterContent from 'views/Content/MasterContent';
import UserScore from 'views/Score/UserScore';
import ScoreList from 'views/Score/ScoreList';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'pe-7s-graph',
		component: Dashboard,
		layout: '/admin'
	},
	// {
	// 	path: '/trainee/:id/view',
	// 	name: 'Dashboard',
	// 	icon: 'pe-7s-graph',
	// 	component: ViewTrainee,
	// 	layout: '/admin',
	// 	invisible: true
	// },
	{
		path: '/category',
		name: 'Master Quiz',
		icon: 'pe-7s-science',
		component: MasterCategory,
		layout: '/admin'
	},
	{
		path: '/list/:id/category',
		name: 'Quiz List',
		icon: 'pe-7s-graph',
		component: QuizList,
		layout: '/admin',
		invisible: true
	},
	// {
	// 	path: '/trainee',
	// 	name: 'Master Trainee',
	// 	icon: 'pe-7s-user',
	// 	component: Trainee,
	// 	layout: '/admin'
	// },
	{
		path: '/content',
		name: 'Master Content',
		icon: 'pe-7s-news-paper',
		component: MasterContent,
		layout: '/admin'
	},
	{
		path: '/trainee',
		name: 'Master Trainee',
		icon: 'pe-7s-user',
		component: UserProfile,
		layout: '/admin'
	},
	{
		path: '/quiz/:id',
		name: 'Data Pengerjaan',
		icon: 'pe-7s-science',
		component: UserScore,
		layout: '/admin',
		invisible: true
	},
	{
		path: '/score/list',
		name: 'Data Pengerjaan',
		icon: 'pe-7s-science',
		component: ScoreList,
		layout: '/admin',
		invisible: true
	},
	{
		path: '/report',
		name: 'Master Report',
		icon: 'pe-7s-science',
		component: MasterReport,
		layout: '/admin',
		invisible: true
	}
	// {
	// 	path: '/table',
	// 	name: 'Application Data',
	// 	icon: 'pe-7s-note2',
	// 	component: TableList,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/typography',
	// 	name: 'Typography',
	// 	icon: 'pe-7s-news-paper',
	// 	component: Typography,
	// 	layout: '/admin'
	// },
	// {
	// 	path: '/icons',
	// 	name: 'Icons',
	// 	icon: 'pe-7s-science',
	// 	component: Icons,
	// 	layout: '/admin'
	// },
	// {
	//   path: '/maps',
	//   name: 'Maps',
	//   icon: 'pe-7s-map-marker',
	//   component: Maps,
	//   layout: '/admin'
	// }
	// {
	// 	path: '/notifications',
	// 	name: 'Notifications',
	// 	icon: 'pe-7s-bell',
	// 	component: Notifications,
	// 	layout: '/admin'
	// }
	// {
	//   upgrade: true,
	//   path: "/upgrade",
	//   name: "Upgrade to PRO",
	//   icon: "pe-7s-rocket",
	//   component: Upgrade,
	//   layout: "/admin"
	// }
];

export default dashboardRoutes;
