import React from 'react';
import styled from 'styled-components';

interface BoxProps {
    Selected: boolean;
};

const NumberBox = styled.button<BoxProps>`
background: ${props => props.Selected ? '#ffffff' : '#d3d3d3'};
cursor: ${props => props.Selected ? 'default' : 'pointer'};
//background: -moz-linear-gradient(left, #aaaaaa 0%, rgb(219,219,219) 100%);
//background: -webkit-linear-gradient(left, #aaaaaa 0%, rgb(219,219,219) 100%);
//background: linear-gradient(to right, #aaaaaa 0%, rgb(219,219,219) 100%);
font-size: 20px; 
line-height: 10px; 
padding: 15px; 
border-radius: 5px; 
font-family: Verdana, Geneva, san-serif; 
font-weight: normal; 
text-decoration: none; 
font-style: normal; 
font-variant: normal; 
text-transform: capitalize;
justify-content: center;
vertical-align: middle;
margin-left :5px;
transform: scale(0.9);
transition: transform 0.5s ease;

&:hover {
background: #ffffff;
transform: scale(1.1);
transition: transform 0.5s ease; }
&:active {
background: rgb(219,219,219); }
`;

interface NumberIconProps {
    UsingNumber: any;
    Selected: boolean;
    children?: React.ReactNode;
    onClick: () => void;
};
const NumberIcon: React.FC<NumberIconProps> = ({ UsingNumber, Selected, onClick }) => {
    return (
        <NumberBox
            Selected={Selected}
            onClick={onClick}
        >
            {UsingNumber}
        </NumberBox>

    )
}

export default NumberIcon
