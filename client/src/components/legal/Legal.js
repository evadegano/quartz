import { Switch, Route } from "react-router-dom";
import Privacy from "./Privacy";
import Terms from "./Terms";


function Legal() {
  return (
    <Switch>
      <Route exact path="/legal/privacy-policy" component={Privacy} />
      <Route exact path="/legal/terms-of-service" component={Terms} />
    </Switch>
  );
}


export default Legal;