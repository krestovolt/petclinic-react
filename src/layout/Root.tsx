import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import SessionStore, { ISessionStore } from '@/stores/SessionStore';
import DevTools from '@/components/DevTools';
import ProtectedRoute from '@/components/ProtectedRoute';
import LazyRoute from '@/components/LazyRoute';
import appLoader from '@/layout/App';
import authLoader from '@/layout/Auth';

useStrict(true);

export default class Root extends Component {
	private session: ISessionStore;

	constructor(props: any) {
		super(props);
		this.session = new SessionStore();
	}

	public render(): ReactNode {
		return (
			<>
				<Provider session={this.session}>
					<Router>
						<Switch>
							<LazyRoute strict path="/auth" loader={authLoader} />
							<ProtectedRoute exact strict path="/" session={this.session} loader={appLoader} />
						</Switch>
					</Router>
				</Provider>
				<DevTools position={{ bottom: 20, right: 20 }} />
			</>
		);
	}
}
