import { AuthContainer, GreetingComponent } from "./components";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useUserStore } from "./stores";

const App = () => {
  const user = useUserStore();
  const token = localStorage.getItem("token");

  // I've no idea what I'm doing here, but it works?
  useEffect(() => {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      user.setUsername(decodedToken[Object.keys(decodedToken)[0]]);
    } else {
      user.clearUsername();
    }
  }, [token]);

  return (
    <main>
      <AuthContainer />
      <GreetingComponent />
    </main>
  );
};

export default App;
