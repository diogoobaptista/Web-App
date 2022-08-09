import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


export interface DropdownProps {
    options?: any[],
    label?: string,
    value?: string,
    onChange: any,
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, value, onChange }) => {
    return (
        <Box sx={{ maxWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {label}
                </InputLabel>
                <NativeSelect
                    onChange={onChange}
                    value={value}
                    inputProps={{
                        name: label,
                        id: 'uncontrolled-native',
                    }}
                >
                    {options.length > 0 && (
                        options.map(option => {
                            return <option value={option}>{option}</option>
                        })
                    )}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}


Dropdown.defaultProps = {
    options: [],
    label: ''
}

export default Dropdown