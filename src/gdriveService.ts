import { gdrive } from './utils/gdrive'

export { gDriveService, FileNotFoundError }

const FILE_NAME = 'data3'

async function getFile(fileName: string) {
	let files = await gdrive.listFiles({
		pageSize: 10,
		spaces: 'appDataFolder',
		fields: 'nextPageToken, files(id, name)',
	})

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
		return gdrive.getFileData(file.id!)
	},
}

class FileNotFoundError extends Error {}
