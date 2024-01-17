import styles from './App.module.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Activity } from './pages/Activity';
import { Details } from './pages/Details';
import { About } from './pages/About';
import { Activities } from './pages/Activities';
import { NotFound } from './pages/NotFound';

export function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/activity" component={Activity} />
					<Route exact path="/home/:id" component={Details} />
					<Route exact path="/about" component={About} />
					<Route exact path="/activities" component={Activities} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
