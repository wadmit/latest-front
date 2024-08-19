"use client"
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { ExpandIcon, QuestIcon } from "../svg";

export function AccordionComp({
    title,
    details,
    expanded
}: {
    title: string;
    details: string | React.ReactElement;
    expanded?: boolean
}) {
    return (
        <Accordion
            defaultExpanded={expanded}
            sx={{
                width: '100%',
                bgcolor: '#FAFAFA',
                boxShadow: 'none',
                borderTop: '0px',
            }}
        >
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                expandIcon={<ExpandIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    height: '72px',
                    borderRadius: '5px',
                    py: '20px',
                    px: '23px',
                    '& .MuiSvgIcon-root': {
                        color: 'black',
                    },
                }}
            >
                <Stack direction="row" gap={1} alignItems="center">
                    <QuestIcon />
                    <Typography variant="subtitle1_sb" fontSize="16px" fontFamily="HankenGroteskExtraBold" color="#5B5B5B">{title}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    bgcolor: 'white',
                    padding: '0px'
                }}
            >
                {details}
            </AccordionDetails>
        </Accordion>
    );
}