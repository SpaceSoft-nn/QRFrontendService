import { loadEnv } from 'vite'
import { CodegenConfig } from '@graphql-codegen/cli'

const env = loadEnv('', process.cwd(), '')

const config: CodegenConfig = {
	schema: env.VITE_GQL_URL,
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
