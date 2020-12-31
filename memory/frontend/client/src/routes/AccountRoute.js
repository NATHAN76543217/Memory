import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AccountRoute = ({isAuth: logged, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (logged === true) {
				console.log("Already logged: redirect to menu");
				return <Redirect to={{ pathname: '/menu'}}/>;
			} else {
				console.log("Not logged yet");
				return <Component {...props} />;
			}
		}}
	/>
);