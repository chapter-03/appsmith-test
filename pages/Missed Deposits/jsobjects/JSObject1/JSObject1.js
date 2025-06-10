export default {
	sendIt: () => {
		if (Network.value == "bsc"){
			ApiBSC.run()
		}
		else if (Network.value == "") {
			Api1.run()
		}
	}
}