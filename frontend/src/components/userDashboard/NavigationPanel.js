import React from 'react';

const NavigationPanel = () => {
	function handleClick(event) {
		console.log(event);
	}
	return (
		<>
			<button onClick={handleClick}>User Details</button>
			<button onClick={handleClick}>User Settings</button>
		</>
	)
}

export default NavigationPanel;
