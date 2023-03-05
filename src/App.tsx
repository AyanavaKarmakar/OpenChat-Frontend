import {
  ErrorToast,
  LoadingAnimation,
  GreetingComponent,
  Navbar,
} from "./components";

const App = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main>
        <GreetingComponent />
        <LoadingAnimation />
        <ErrorToast />
      </main>
    </>
  );
};

export default App;
