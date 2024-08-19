import { styled, TableCell, tableCellClasses } from "@mui/material";
import { StepperProps } from "./type";

  
  export function getStepperStyles(activeStep: number, id: number): StepperProps {
    const Green = '#479F76';
    const MutedGrey = '#ADADAD';
  
    const style1: StepperProps = {
      backgroundColor: 'transparent',
      color: id === 1 ? Green : MutedGrey,
      text: id === 1 ? Green : MutedGrey,
      border: id === 1 ? `1px solid ${Green}` : `1px solid ${MutedGrey}`,
    };
    const style2: StepperProps = {
      backgroundColor: id === 1 ? Green : 'transparent',
      color: id === 1 ? 'white' : id === 2 ? Green : MutedGrey,
      text: id === 1 ? '' : id === 2 ? Green : MutedGrey,
      border:
        id === 1
          ? '0px'
          : id === 2
          ? `1px solid ${Green}`
          : `1px solid ${MutedGrey}`,
    };
    const style3: StepperProps = {
      backgroundColor: id !== 3 ? Green : 'transparent',
      color: id !== 3 ? '' : Green,
      text: id !== 3 ? '' : Green,
      border: id !== 3 ? '0px' : `1px solid ${Green}`,
    };
  
    const config: Record<number, StepperProps> = {
      0: style1,
      1: style2,
      2: style2,
      3: style3,
      4: style3,
    };
    const defaultConfig: StepperProps = {
      backgroundColor: Green,
      color: '',
      text: '',
      border: '0px',
    };
  
    return config[activeStep] || defaultConfig;
  }
  

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FAFAFA',
        border: 0,
    },
    // [`&.${tableCellClasses.body}`]: {
    //     fontSize: 14,
    //     color: '#333333 !important',
    // },
}));