const FILE_NAME = 'data3'

async function getFile(fileName: string) {
	let response
	try {
		response = await gapi.client.drive.files.list({
			pageSize: 10,
			spaces: 'appDataFolder',
			fields: 'nextPageToken, files(id, name)',
		})
	} catch (err) {
		console.error('Failed to get files from gdrive', err)
		throw err
	}

	const files = response.result.files

	if (!files) {
		throw new FileNotFoundError()
	}

	const file = files.find((file) => file.name === fileName)
	if (!file) {
		throw new FileNotFoundError()
	}

	return file
}

async function updateFile(file: gapi.client.drive.File, data: string) {
	const accessToken = gapi.auth.getToken().access_token

	try {
		await fetch(
			`https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=media`,
			{
				method: 'PATCH',
				headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
				body: data,
			}
		)
	} catch (err) {
		console.error('Failed to update file', err)
		throw err
	}
}

async function createFileWithContent(content: string) {
	const file = new Blob([content], { type: 'text/plain' })
	const metadata = {
		name: FILE_NAME,
		mimeType: 'text/plain',
		parents: ['appDataFolder'], // Google Drive folder id
	}

	const accessToken = gapi.auth.getToken().access_token
	const form = new FormData()
	form.append(
		'metadata',
		new Blob([JSON.stringify(metadata)], { type: 'application/json' })
	)
	form.append('file', file)

	try {
		await fetch(
			'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true',
			{
				method: 'POST',
				headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
				body: form,
			}
		)
	} catch (err) {
		console.error('Failed to create file', err)
		throw err
	}
}

const gDriveService = {
	async save(data: string) {
		try {
			const file = await getFile(FILE_NAME)
			await updateFile(file, data)
		} catch (err) {
			if (err instanceof FileNotFoundError) {
				await createFileWithContent(data)
				return
			}

			throw err
		}
	},

	async getData() {
		const file = await getFile(FILE_NAME)

		const accessToken = gapi.auth.getToken().access_token
		try {
			const res = await fetch(
				`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
				{
					headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
				}
			)
			const data = await res.text()
			return data
		} catch (err) {
			console.error('Failed to read file', err)
			throw err
		}
	},
}

class FileNotFoundError extends Error {}

export default gDriveService
