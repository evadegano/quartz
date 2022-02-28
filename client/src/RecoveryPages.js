import { Switch, Route } from "react-router-dom";
import ResetRequest from "./components/recovery/reset-request";
import ResetPwd from "./components/recovery/reset-pwd";



function RecoveryPages(props) {
  return (
    <div>
      <Switch>
        <Route path="/request" component={ResetRequest} />
        <Route path="/:userId" component={ResetPwd} />
      </Switch>
    </div>
  );
}


export default RecoveryPages;