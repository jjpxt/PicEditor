import { StatusBar, } from "react-native";
import Navigation from "./app/navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#181c14" />
      <Navigation />
    </GestureHandlerRootView>
  )
};

export default App;