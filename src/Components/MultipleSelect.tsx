import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IMultipleSelect } from "../Model/MultiSelectModel";
import { multiSelectOverwriteValue } from "../utils/multiSelectOverwriteValue";

//helper function for mui --------------------------
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(
  option: string | number,
  selectedValues: string[] | number[],
  theme: any
) {
  return {
    fontWeight:
      selectedValues.indexOf(option as never) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
//---------------------------------------------------

const MultipleSelect = ({
  options,
  label,
  selectedValues,
  setSelectedValues,
}: IMultipleSelect) => {
  const theme = useTheme();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    multiSelectOverwriteValue(value, selectedValues, setSelectedValues);
  };

  return (
    <div style={{ width: "95%" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          size="medium"
        >
          {options.map((option: any) => (
            <MenuItem
              key={label === "Areas" ? option.area : option}
              value={label === "Areas" ? option.id : option}
              style={getStyles(
                label === "Areas" ? option.area : option,
                selectedValues,
                theme
              )}
            >
              {label === "Areas" ? option.area : option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
