import { useParams } from 'react-router-dom'
import { WorkspaceDetails } from '@/features/workspace'

export const WorkSpacePage = () => {
	const { workspaceId } = useParams<{ workspaceId: string }>()

	return <WorkspaceDetails id={workspaceId} />
}
