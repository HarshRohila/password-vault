import { Credential } from '../components/forms/CredentialForm'
import gDriveService from '../gdriveService'

let credentials: Credential[]

const credentialService = {
	async fetchCredentials() {
		try {
			const csvData = await gDriveService.getData()
			return csvData.split('/n').map((line) => {
				const [name, password] = line.split(',')
				const credential: Credential = {
					name,
					password,
				}

				return credential
			})
		} catch {
			return []
		}
	},

	async getCredentials() {
		if (!credentials) {
			credentials = await this.fetchCredentials()
		}

		return credentials
	},
}

export default credentialService
