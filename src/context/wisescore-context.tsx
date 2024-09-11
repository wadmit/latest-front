
import { IWiseScoreDetailsContext } from '@/types/wisescore';
import { createContext } from 'react';

const WiseScoreDetailsContext = createContext<IWiseScoreDetailsContext>({
    primaryColor: '',
    secondaryColor: '',
    variant: '',
    version: '',
    endPoint: '',    closeModal: () => { },
});

export default WiseScoreDetailsContext;
