import BackButton from '@/components/buttons/back-button';
import TopBarContainer from '@/components/top-bar-container/top-bar-container';
import PDASkeleton from './components/pda-skeleton';

export function LoadingPDAPage() {
    return <>
        <TopBarContainer>
            <BackButton />
        </TopBarContainer>
        <PDASkeleton />
    </>;
}
