import { IScoreGaugeProps } from '@/types/other';
import {
    Box,
    CircularProgress,
    circularProgressClasses,
    Typography,
  } from '@mui/material';
  
  
  function ScoreGauge({
    value,
    type = 'orange',
    offsetColor = 'primary',
    showValue = true,
    color = 'primary.light',
    ...rest
  }: IScoreGaugeProps) {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexBasis: '5.5rem',
          flexShrink: 0,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={value}
          thickness={4}
          size={99}
          sx={{
            color,
            position: 'absolute',
            zIndex: 10,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          {...rest}
        />
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Typography
            variant="caption"
            fontSize="20px"
            sx={{
              color,
            }}
          >
            {showValue ? (value === 0 ? '' : `${Math.ceil(value)}%`) : ''}
          </Typography>
        </Box>
        <CircularProgress
          variant="determinate"
          value={100}
          thickness={4}
          size={99}
          sx={{
            color,
            opacity: '20%',
            position: 'absolute',
            zIndex: 0,
          }}
        />
      </Box>
    );
  }
  
  export default ScoreGauge;
  