"use client"
import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Svg1, Svg10, Svg11, Svg12, Svg13, Svg14, Svg2, Svg3, Svg4, Svg5, Svg6, Svg7, Svg8, Svg9 } from '../svgs';



type Props = {
    step: number;
};

const BoxWrapper = styled(Box)`
@media (max-height: 640px) {
    display: none;
}
`
const RenderSvg: React.FC<Props> = ({ step }) => {
    const svgData = [
        { position: { bottom: -8.399999988, left: '0%' }, zIndex: 10, component: <Svg1 /> },
        { position: { bottom: -8.399999988, left: '5%' }, zIndex: 20, component: <Svg2 /> },
        { position: { bottom: -8.399999988, left: '17%' }, zIndex: 30, component: <Svg3 /> },
        { position: { bottom: -8.399999988, left: '28%' }, zIndex: 10, component: <Svg4 /> },
        { position: { bottom: 20, left: '2%' }, zIndex: 5, component: <Svg5 /> },
        { position: { bottom: -8.399999988, left: '-6%' }, zIndex: 2, component: <Svg6 /> },
        { position: { bottom: -8.399999988, right: '28%' }, zIndex: 30, component: <Svg7 /> },
        { position: { bottom: -8.399999988, right: '15%' }, zIndex: 10, component: <Svg8 /> },
        { position: { bottom: -8.399999988, right: '4%' }, zIndex: 20, component: <Svg9 /> },
        { position: { bottom: -8.399999988, right: '0%' }, zIndex: 10, component: <Svg10 /> },
        { position: { bottom: -8.399999988, right: '5%' }, zIndex: 2, component: <Svg11 /> },
        { position: { bottom: -8.399999988, right: '7%' }, zIndex: 1, component: <Svg12 /> },
        { position: { bottom: -8.399999988, right: '-4%' }, zIndex: 1, component: <Svg13 /> },
        { position: { bottom: -8.399999988, right: '35%' }, zIndex: 1, component: <Svg14 /> },
    ];

    const endIndex = Math.min(step, svgData.length);
    const slicedComponents = svgData.slice(0, endIndex);

    const mappedComponents = slicedComponents.map((data, index) => (
        <BoxWrapper
            key={`${index}_svg`}
            position="absolute"
            lineHeight={0}
            bottom={data.position.bottom + 8}
            left={data.position.left}
            right={data.position.right}
            zIndex={data.zIndex}
            sx={{
                animation: 'wiseSvgs 0.5s ease-out',
                '& @media (max-height: 640px)': {
                    display: 'none',
                }
            }}
        >
            {/* <Svg1 /> */}
            {data.component}
        </BoxWrapper>
    ));

    return <>{mappedComponents}</>;
};

export default RenderSvg;
