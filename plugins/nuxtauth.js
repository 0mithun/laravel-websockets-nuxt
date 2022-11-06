export default function ({ $auth }) {
	// Set name & Function == Hack it anyway
	$auth.strategy.options.tokenName = 'Authorization'
	$auth.getToken = (name) => {
		return $auth.strategy.token.get()
	}
}
