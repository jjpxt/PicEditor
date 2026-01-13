import { StatusBar, } from "react-native";
import Navigation from "./app/navigation";

// NPM RUN ANDROID

const App = () => {
  return (<>
    <StatusBar backgroundColor="#181c14" />
    <Navigation />
  </>
  )
};

export default App;