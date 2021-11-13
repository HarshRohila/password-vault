export { mockedEnv }
export type { MockObjConfig }

async function mockedEnv(
	configs: MockObjConfig[],
	callback: () => Promise<void>
) {
	let originals: OriginalObjConfig[] = []

	configs.forEach((config) => {
		let orginalConfig: OriginalObjConfig = {
			object: config.object,
			originals: {},
		}

		let mocks = Object.entries(config.mocks)
		for (let [prop, funcMock] of mocks) {
			orginalConfig.originals[prop] = config.object[prop]

			config.object[prop] = funcMock
		}

		originals.push(orginalConfig)
	})

	await callback()

	originals.forEach((original) => {
		let obj = original.object

		let orgs = Object.entries(original.originals)
		for (let [prop, originalFun] of orgs) {
			obj[prop] = originalFun
		}
	})
}

interface MockObjConfig {
	object: Record<string, Function>
	mocks: Record<string, Function>
}

interface OriginalObjConfig {
	object: Record<string, Function>
	originals: Record<string, Function>
}
