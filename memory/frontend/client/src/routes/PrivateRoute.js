import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({isAuth: logged, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (logged !== true) {
				console.log("Not logged");
				return <Redirect to="/" />;
			} else {
				console.log("Logged !");
				return <Component {...props} />;
			}
		}}
	/>
);