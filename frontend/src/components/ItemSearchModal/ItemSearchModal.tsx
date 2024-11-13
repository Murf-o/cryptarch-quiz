import { Autocomplete, Box, Modal, TextField, Typography } from "@mui/material";
import { WeaponItem } from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Responsive width
  maxWidth: 400, // Maximum width to maintain box size
  bgcolor: "#212121", // Darker gray for better contrast
  border: "2px solid #424242", // Subtle border for depth
  borderRadius: "8px", // Rounded corners
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow for depth
  p: 4,
  zIndex: 1000, // Ensure it appears above other elements
  color: "white", // Text color for contrast
};
const autocompleteStyle = {
  width: "100%", // Full width of the parent box
  backgroundColor: "#424242", // Background for the input
  borderRadius: "4px",
  color: "white", // Text color
  "& .MuiInputBase-input": {
    color: "white", // Input text color
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#424242", // Input background color
    border: "1px solid #757575", // Input border color
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#757575", // Notched outline color
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ffffff", // Outline color on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ffffff", // Outline color when focused
  },
  "& .MuiFormLabel-root": {
    color: "#bdbdbd", // Label color
  },
  "& .MuiInputBase-root.Mui-focused .MuiFormLabel-root": {
    color: "#ffffff", // Label color when focused
  },
};

interface ItemSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  weaponItems: WeaponItem[];
}

function ItemSearchModal({
  isOpen,
  onClose,
  weaponItems,
}: ItemSearchModalProps): React.ReactNode {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Autocomplete
          open={true}
          sx={autocompleteStyle}
          options={weaponItems}
          getOptionLabel={(option) => option.name} // Display the name as the label
          filterOptions={
            (options, state) =>
              options
                .filter((option) =>
                  option.name
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                )
                .slice(0, 10) // Only show top 10 matching options
          }
          renderInput={(params) => <TextField {...params} label="Search" />}
          renderOption={(props, option) => {
            const newProps = { ...props, key: option.id };
            return (
              <Box
                component="li"
                {...newProps}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "black",
                  "&.MuiAutocomplete-option:hover, &.MuiAutocomplete-option.Mui-focused":
                    {
                      backgroundColor: "grey", // color change on hover and when out of focus and no other dropdown item in focus
                    },
                }}
              >
                <img
                  src={option.iconURL}
                  alt={option.name}
                  style={{ width: 40, height: 40, marginRight: 16 }}
                />
                <Typography variant="body1" color="white">
                  {option.name}
                </Typography>
              </Box>
            );
          }}
        />
      </Box>
    </Modal>
  );
}

export default ItemSearchModal;
