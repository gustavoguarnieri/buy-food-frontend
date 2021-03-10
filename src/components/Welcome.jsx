import UserService from "../services/UserService";

const Welcome = () => (
   <div className="jumbotron">
       <div class="mx-auto text-center">
           <h1 class="mx-auto my-0 text-uppercase">Buy food</h1>
           <h2 class="text-black-50 mx-auto mt-2 mb-5">O lugar certo para matar sua fome!</h2>
           <button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>Login</button>
       </div>
   </div>
)

export default Welcome
