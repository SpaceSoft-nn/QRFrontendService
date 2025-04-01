import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: process.env.GRAPHQL_URL || 'http://185.247.185.17:8876/graphql',
	documents: ['src/**/*.{ts,tsx}'],
	generates: {
		'./src/shared/api/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
				withHOC: false,
				withComponent: false,
				exportFragmentSpreadSubTypes: true,
				dedupeFragments: true
			}
		}
	},
	ignoreNoDocuments: true
}

export default config
