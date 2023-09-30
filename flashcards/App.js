import { useState } from 'react';
import { Image, Pressable, StyleSheet, Switch, TouchableWithoutFeedback, View, Appearance } from 'react-native';

import MenuIcon from './assets/menu.png';
import Quiz from './pages/Quiz';
import Menu from './components/Menu';

const mode = 'light'; // Appearance.getColorScheme();

export default function App() {
	const [isDark, setIsDark] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const changeHandler = () => {
		setIsDark(!isDark);
	}

	console.log(isMenuOpen)
	return (
		<View style={styles.background} >
			<Pressable onPress={() => setIsMenuOpen(!isMenuOpen)} hitSlop={50} >
				<Image source={MenuIcon} style={styles.menu} />
			</Pressable>
			{/* <Switch
				onValueChange={changeHandler}
				value={isDark}
				style={styles.modeSwitch}
				trackColor={{ true: "grey" }}
				thumbColor={isDark ? "#000000" : "#ffffff"}
				/> */}
			<Quiz />
			<Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
		</View>
	);
}

var styles;
if(mode === 'dark') {
	styles = StyleSheet.create({
		modeSwitch: {
			position: 'absolute',
			top: 20,
			left: 5,
		},
		background: {
			flex: 1,
			backgroundColor: '#000',
		},
		menu: {
			position: 'absolute',
			top: 30,
			left: 10,
			width: 30,
			height: 30,
			zIndex: 2,
		},
	});
} else {
	styles = StyleSheet.create({
		modeSwitch: {
			position: 'absolute',
			top: 20,
			left: 5,
		},
		background: {
			flex: 1,
			backgroundColor: '#fff',
		},
		menu: {
			position: 'absolute',
			top: 30,
			left: 10,
			width: 30,
			height: 30,
			zIndex: 2,
		},
	});
}