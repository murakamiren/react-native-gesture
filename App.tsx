import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import MoveCircle from "./components/moveCircle";

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<MoveCircle />
			<StatusBar style="auto" />
		</View>
	);
}
