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

const gDriveService = {
	async save(data: string) {
		try {
			const file = await getFile(FILE_NAME)
			await gdrive.updateFile(file.id!, data)
		} catch (err) {
			if (err instanceof FileNotFoundError) {
				await gdrive.createFileWithContent(FILE_NAME, data)
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
