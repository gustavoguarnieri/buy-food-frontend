import { BrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import Welcome from "./Welcome";

const App = () => (
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
);

export default App;
