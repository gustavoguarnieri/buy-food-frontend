import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import StoreService from "../services/StoreService";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import Welcome from "./Welcome";

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <RenderOnAnonymous>
          <Welcome/>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <Home/>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
