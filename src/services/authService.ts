const CLIENT_ID =
	'915366085425-g67320oeaa7mjsupb585e9fg96rvv08t.apps.googleusercontent.com'
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
	'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
]

export const authService = {
	async login() {
		await window.gapi.client.init({
			scope:
				'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata',
			apiKey: 'AIzaSyAeLfGTWQtvJoiWFvWb1ZLsCDJ5xUHr8so',
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
		})
		await gapi.auth2.getAuthInstance().signIn()
	},

	async logout() {
		await window.gapi.auth2.getAuthInstance().signOut()
	},
}
