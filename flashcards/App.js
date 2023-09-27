import { StyleSheet, Switch, View } from 'react-native';
import Quiz from './pages/Quiz';
import { useState } from 'react';

export default function App() {
	const [isDark, setIsDark] = useState(false);

	const changeHandler = () => {
		setIsDark(!isDark);
	}

	return (
		<View style={styles.background} >
			{/* <Switch
				onValueChange={changeHandler}
				value={isDark}
				style={styles.modeSwitch}
				trackColor={{ true: "grey" }}
				thumbColor={isDark ? "#000000" : "#ffffff"}
				/> */}
			<Quiz />
		</View>
	);
}

const styles = StyleSheet.create({
    modeSwitch: {
        position: 'absolute',
        top: 20,
        left: 5,
    },
	background: {
		flex: 1,
		backgroundColor: '#fff',
	}
});
