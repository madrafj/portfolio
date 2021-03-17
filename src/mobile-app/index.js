import React from 'react';
import ViewMenu from './view/vwMenu';
import './ricognisi.css';

const AppIntro = ()=> {
	return (
		<div style={{padding: '5px 20px'}}>
			<p>
				<b>Ricognisi</b> is a Mobile Attendance System Client App, powered with Face
				Recognition Technology. However, we didn't include <b><i>that </i></b>
				feature in this Demo. Because the CNN models weigh about 10 MB size. 
				<b>This is just a skeleton of the App</b>.
			</p>
			<ol>
				What I implemented here:
				<li>Styling
					<ul>
						<li>Hide/Show View</li>
						<li>Transition and Animation</li>
						<li>Sticky Header Table</li>
					</ul>
				</li>
				<li>Firebase
					<ul>
						<li>LogIn/LogOut using .auth</li>
						<li>Database using .database</li>
					</ul>
				</li>
				<li>React Hooks
					<ul>
						<li>useState</li>
						<li>useEffect</li>
						<li>useRef</li>
					</ul>
				</li>
				<li>Others
					<ul>
						<li>Camera using mediaDevices.getUserMedia</li>
						<li>Local Storage</li>
					</ul>
				</li>
			</ol>
			<ul>
				<b>LOGIN</b>
				<li>User ID : momo@mail99.com</li>
				<li>Password: 123456</li>
			</ul>
		</div>

	)
}

const Ricog = ()=> {
	return (
		<div class="main">
			<div className="AbsenCam" style={{placeSelf: 'center'}}>
				<ViewMenu />
			</div>
			<AppIntro />
		</div>

	);
}

export default Ricog