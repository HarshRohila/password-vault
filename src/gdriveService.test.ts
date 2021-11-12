import { FileNotFoundError, gDriveService } from './gdriveService'
import { gdrive } from './utils/gdrive'

const FILE_NAME = 'data3'

describe('gdriveService', () => {
	describe('getData', () => {
		it('gets data from a drive file', async () => {
			gdrive.listFiles = jest
				.fn()
				.mockResolvedValueOnce([{ id: 'fileId', name: FILE_NAME }])
			gdrive.getFileData = jest.fn().mockResolvedValueOnce('file data')

			expect(await gDriveService.getData()).toBe('file data')
		})

		it('throws error if file not found in drive', async () => {
			expect.assertions(2)

			gdrive.listFiles = jest.fn().mockResolvedValueOnce([])

			const testFileNotFound = async () => {
				gdrive.getFileData = jest.fn().mockResolvedValueOnce('file data')

				await expect(gDriveService.getData()).rejects.toBeInstanceOf(
					FileNotFoundError
				)
			}

			const testFileNotFoundWithName = async () => {
				let file = { id: 'anyId', name: 'invalid name' }
				gdrive.listFiles = jest.fn().mockResolvedValueOnce([file])
				await expect(gDriveService.getData()).rejects.toBeInstanceOf(
					FileNotFoundError
				)
			}

			await testFileNotFound()
			await testFileNotFoundWithName()
		})
	})

	describe('save', () => {
		it('creates file if file not found', async () => {
			gdrive.listFiles = jest.fn().mockResolvedValueOnce([])
			gdrive.createFileWithContent = jest.fn()

			await gDriveService.save('new file content')

			expect(gdrive.createFileWithContent).toBeCalledWith(
				FILE_NAME,
				'new file content'
			)
		})

		it('updates file if file found', async () => {
			let file = { id: 'fileId', name: FILE_NAME }
			gdrive.listFiles = jest.fn().mockResolvedValueOnce([file])
			gdrive.updateFile = jest.fn()

			await gDriveService.save('new file content')

			expect(gdrive.updateFile).toBeCalledWith('fileId', 'new file content')
		})
	})
})
