import { ErrorToast, LoadingAnimation, GreetingComponent } from "./components";

const App = () => {
  return (
    <>
      <GreetingComponent />
      <LoadingAnimation />
      <ErrorToast />
    </>
  );
};

export default App;
