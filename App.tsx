import { StatusBar, } from "react-native";
import Home from "./app/views/Home";

// NPM RUN ANDROID

const App = () => {
  return (<>
    <StatusBar backgroundColor="#181c14" />
    <Home />
  </>
  )
};

export default App;