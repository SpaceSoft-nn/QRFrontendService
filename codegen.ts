import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: './schema.graphql',
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
