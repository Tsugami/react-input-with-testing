import "./App.css";
import { TestForm } from "./form/form";

function App() {
  return <TestForm onSubmit={() => console.log("submit")} />;
}

export default App;
