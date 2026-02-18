import styles from './App.module.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { About } from './pages/About';
import { Activities } from './pages/Activities';
import { NotFound } from './pages/NotFound';

export function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/activity" component={Form} />
					<Route exact path="/home/:id" component={Detail} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
