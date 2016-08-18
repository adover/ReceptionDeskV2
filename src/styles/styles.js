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

export const fonts = {
	'din': 'DIN OT',
	'portrait': 'Portrait Text'
}

/**
 * This is a stylesheet declaration, React Native doesn't use CSS, instead opting to use an object.
 * It's pretty cool to use as we can just nest each of the style declarations in a view,
 * which I plan to do when I'm refactoring
 */

const optionDefault = {
		color: ysColours['samuraijack'],
		textAlign: 'center',
		fontSize: 20,
		lineHeight: 20,
		fontFamily: fonts.din,
}

const touchableDefault = {
	marginBottom: 20,
	flex: 1,
	margin: 20,
	padding: 20,
	justifyContent: 'center',
	borderWidth: 10,
	borderStyle: 'solid'
}

const row = {
	flexDirection: 'row',
	alignItems: 'flex-start',
	alignSelf: 'stretch',
  flexWrap: 'wrap',
  flex: 1,
}

const column = {
	flex: 1,
	flexDirection: 'row',
	alignItems: 'center',
	backgroundColor: 'green'	
}

const mainTitle = {
	color: ysColours['samuraijack'],
	fontSize: 55,
	textAlign: 'center',
	marginBottom: 10,
	marginTop: 50,
	fontFamily: fonts.portrait,
	alignSelf: 'stretch',
	flex: 0.2
}

/**
 * As the stylesheet is growing, I've decided to start splitting stuff out, this will make it eventually
 * easier to read
 */

export const welcomeStyles = StyleSheet.create({
	touchable: {
		...touchableDefault,
		borderColor: ysColours['squirtle'],
		height: 250
	}
})

const styles = StyleSheet.create({
	alignCenter: {
		alignItems: 'center'
	},
	/**
	 * ScrollView just doesn't seem to enjoy itself unless heights are explicitly set
	 */
	fullHeight: {
		flex: 1
	},
	colour_1_border: {
		borderColor: ysColours['bart'],
	},
	colour_2_border: {
		borderColor: ysColours['patrick'],
	},	
	colour_2_bg: {
		backgroundColor: ysColours['patrick'],
	},
	colour_3_border: {
		borderColor: ysColours['stitch'],
	},
	mainView: {
		backgroundColor: ysColours['edna'],
		padding: 20,
		flex: 1,
		flexDirection: 'column'
	},
	row: {
		...row,
	},
	/**
	 * For rows that need a bottom margin
	 */
	marginBottom: {
		marginBottom: 100
	},
	header: {
		height: 50,
		flexDirection: 'row'
	},
	textLeft: {
		...optionDefault,
		fontSize: 12,
		textAlign: 'left',
		flex: 1
	},
	textRight: {
		...optionDefault,
		fontSize: 12,
		textAlign: 'right',
		flex: 1
	},
	scrollView: {
		height: 200
	},
	mainTitle: {
		...mainTitle
	},	
	subTitle: {
		...mainTitle,
		fontSize: 40,
		marginTop: 70,
		marginBottom: -20
	},
	bigTitle: {
		...mainTitle,
		marginBottom: -50,
		color: ysColours['samuraijack'],
		fontSize: 80
	},
	question: {
		color: ysColours['samuraijack'],
		textAlign: 'center',
		fontSize: 20,
		fontFamily: fonts.din,
		fontWeight: 'bold',
		marginBottom: 20
	},
	option: {
		...optionDefault,
		fontWeight: 'bold'
	},	
	optionNoBorder: optionDefault,
	touchableButton: {
		borderWidth: 10,
		borderStyle: 'solid',
		borderColor: 'orange',
		alignItems: 'center',
		justifyContent: 'center',
		height: 90
	},
	touchable: {
		marginBottom: 20,
		margin: 20,
		padding: 20,
		borderWidth: 10,
		borderStyle: 'solid',
		justifyContent: 'center',
		height: 90,
		width: 200,
	},
	button: {
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontFamily: fonts.din
	},
	smallText: {
		color: ysColours['samuraijack'],
		textAlign: 'center',
		fontSize: 16,
		fontFamily: fonts.din,
		fontWeight: 'bold',
		marginBottom: 20
	},
	error: {
		color: ysColours['courage'],
		textAlign: 'center',
		fontSize: 10,
	},
	textInput: {
		alignSelf: 'stretch',
		textAlign: 'center',
		height: 90,
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: ysColours['edna'], // Setting this as a hack due to the behaviour of autoComplete
		marginBottom: 20,
		fontFamily: fonts.din,
		lineHeight: 50,
		fontWeight: 'bold',
		color: ysColours['edna']
	},
	drinkOption: {
		...touchableDefault,
		width: 250,
		height: 90,
		borderWidth: 10,
		borderStyle: 'solid',
		borderColor: ysColours['stimpy']
	},
	standardFont: {
		...optionDefault,
		fontWeight: 'bold'
	}
});
export default styles;