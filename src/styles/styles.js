import { 
	StyleSheet, 
} from 'react-native';

/**
 * Build an object of all the YS colours
 */

export const ysColours = {
	'batman': '#000000',
	'godzilla': '#202c2f',
	'samuraijack': '#f6f6f6',
	'trump': '#b58745',
	'stimpy': '#ee342f',
	'patrick': '#f05f67',
	'kenny': '#f47e34',
	'courage': '#daa7b7',
	'price': '#461c57',
	'mojojojo': '#805ba6',
	'stitch': '#45cdbc',
	'bart': '#f6c02d',
	'squirtle': '#8fc1bf',
	'edna': '#002b41',
	'thehulk': '#d7c700'
}

const fonts = {
	'din': 'DIN OT',
	'portrait': 'Portrait Text'
}

/**
 * This is a stylesheet declaration, React Native doesn't use CSS, instead opting to use an object.
 * It's pretty cool to use as we can just nest each of the style declarations in a view,
 * which I plan to do when I'm refactoring
 */

const styles = StyleSheet.create({
	view: {
		backgroundColor: ysColours['edna'],
		flex: 1,
		padding: 20
	},
	mainTitle: {
		color: ysColours['thehulk'],
		fontSize: 40,
		textAlign: 'center',
		marginBottom: 10,
		marginTop: 50,
		fontFamily: fonts.portrait
	},
	question: {
		color: ysColours['samuraijack'],
		textAlign: 'center',
		fontSize: 20,
		fontFamily: fonts.din,
		fontWeight: 'bold',
		marginBottom: 50
	},
	touchableOption: {
		marginBottom: 20
	},
	option: {
		color: ysColours['samuraijack'],
		textAlign: 'center',
		fontSize: 20,
		lineHeight: 40,
		padding: 10,
		fontFamily: fonts.din,
		borderWidth: 10,
		borderColor: ysColours['squirtle'],
		borderStyle: 'solid'
	},
	button: {
		color: ysColours['courage'],
		textAlign: 'center',
		fontSize: 20,
		fontFamily: fonts.din,
		backgroundColor: ysColours['stimpy']
	},
	textInput: {
		alignSelf: 'stretch',
		height: 50,
		padding: 10,
		fontFamily: fonts.din,
		fontWeight: 'bold',
		backgroundColor: ysColours['squirtle'],
		color: ysColours['edna']
	}
});

export default styles;