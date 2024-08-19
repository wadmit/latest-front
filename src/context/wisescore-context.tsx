
import { IWiseScoreDetailsContext } from '@/types/wisescore';
import { createContext } from 'react';

const WiseScoreDetailsContext = createContext<IWiseScoreDetailsContext>({
    primaryColor: '',
    secondaryColor: '',
    variant: '',
    version: '',
    endPoint: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    closeModal: () => { },
});

export default WiseScoreDetailsContext;
