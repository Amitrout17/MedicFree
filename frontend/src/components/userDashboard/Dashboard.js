import React from 'react';
import NavigationPanel from './NavigationPanel.js';
import './Dashboard.css';

const Dashboard = () => {
	return (
		<div className="dashboardMenu">

			<div className="navigationPanel dashboardMenu-child">
				<NavigationPanel />
			</div>

			<div className="dashboardPanelContent dashboardMenu-child">Dashboard Panel Content</div>

		</div>
	);
}

export default Dashboard;
