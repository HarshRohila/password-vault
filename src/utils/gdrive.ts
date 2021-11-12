export { gdrive }

function getToken() {
	return gapi.auth.getToken().access_token
}

let gdrive = {
	async listFiles(
		args:
			| {
					alt?: string | undefined
					corpora?: string | undefined
					corpus?: string | undefined
					driveId?: string | undefined
					fields?: string | undefined
					includeItemsFromAllDrives?: boolean | undefined
					includePermissionsForView?: string | undefined
					includeTeamDriveItems?: boolean | undefined
					key?: string | undefined
					oauth_token?: string | undefined
					orderBy?: string | undefined
					pageSize?: number | undefined
					pageToken?: string | undefined
					prettyPrint?: boolean | undefined
					q?: string | undefined
					quotaUser?: string | undefined
					spaces?: string | undefined
					supportsAllDrives?: boolean | undefined
					supportsTeamDrives?: boolean | undefined
					teamDriveId?: string | undefined
					userIp?: string | undefined
			  }
			| undefined
	) {
		try {
			var response = await gapi.client.drive.files.list(args)
		} catch (err) {
			console.error('Failed to get files from gdrive', err)
			throw err
		}

		return response.result.files
	},

	async getFileData(fileId: string) {
		try {
			const res = await fetch(
				`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
				{
					headers: new Headers({ Authorization: 'Bearer ' + getToken() }),
				}
			)
			const data = await res.text()
			console.log(data)
			return data
		} catch (err) {
			console.error('Failed to read file', err)
			throw err
		}
	},
}
