import { FileNotFoundError, gDriveService } from './gdriveService'
import { gdrive } from './utils/gdrive'

describe('gdriveService', () => {
	describe('getData', () => {
		it('gets data from a drive file', async () => {
			gdrive.listFiles = jest
				.fn()
				.mockResolvedValueOnce([{ id: 'fileId', name: 'data3' }])
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
})
