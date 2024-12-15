import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const Mohamed = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/default`} component={lazy(() => import(`./default`))} />
      <Route path={`${match.url}/part2`} component={lazy(() => import(`./part2`))} />
      <Route path={`${match.url}/clients/:clientId`} component={lazy(() => import(`./clients/view`))} />
      <Route exact path={`${match.url}/clients`} component={lazy(() => import(`./clients`))} />
      <Redirect exact from={`${match.url}`} to={`${match.url}/default`} />
    </Switch>
  </Suspense>
);

export default Mohamed;