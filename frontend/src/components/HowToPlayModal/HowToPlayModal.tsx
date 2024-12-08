import { Modal, Box, Typography, Button } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "rgba(20, 20, 40, 0.95)", // Dark background with transparency
  color: "#FFFFFF", // White text
  border: "2px solid #6A0DAD", // Glowing purple border
  boxShadow: "0px 0px 20px 5px #6A0DAD", // Glowing shadow
  p: 4,
  borderRadius: 3,
  textAlign: "center",
  fontFamily: "'Exo 2', sans-serif", // Futuristic font
};

const buttonStyle = {
  backgroundColor: "#6A0DAD",
  color: "#FFFFFF",
  fontWeight: "bold",
  textTransform: "uppercase",
  borderRadius: 20,
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#8B00FF", // Slightly brighter on hover
  },
};

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  return (
    <>
      {/* Modal */}
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="how-to-play-title"
        aria-describedby="how-to-play-description"
      >
        <Box sx={modalStyle}>
          {/* Title */}
          <Typography id="how-to-play-title" variant="h5" gutterBottom>
            How to Play - The Cryptarch Quiz
          </Typography>

          {/* Instructions */}
          <Typography id="how-to-play-description" variant="body1" paragraph>
            Welcome, Guardian, to The Cryptarch Quiz! Test your knowledge of
            Destiny 2 weapons and mechanics in this challenging puzzle game.
          </Typography>
          <Typography variant="body2" paragraph>
            1. <strong>The Grid</strong>: You’ll see a 3x3 grid. Each cell
            represents the intersection of a row and column.
          </Typography>
          <Typography variant="body2" paragraph>
            2. <strong>Row and Column Requirements</strong>: Each row and column
            has specific requirements based on Destiny 2 weapon attributes, such
            as weapon type, rarity, or elemental affinity (e.g., Legendary
            Sniper Rifle or Solar Pulse Rifle).
          </Typography>
          <Typography variant="body2" paragraph>
            3. <strong>Selecting Weapons</strong>: Click on a cell to pick a
            weapon from the Destiny 2 arsenal. Choose wisely to satisfy the
            requirements for both the row and the column.
          </Typography>
          <Typography variant="body2" paragraph>
            4. <strong>Winning the Quiz</strong>: Successfully fill all cells in
            the grid with the correct weapons. The grid is complete when all
            rows and columns are satisfied.
          </Typography>
          <Typography variant="body2" paragraph>
            5. <strong>Compete and Save</strong>: Log in to save your progress,
            appear on the leaderboard, and prove you're a true Cryptarch expert.
          </Typography>

          {/* Closing Encouragement */}
          <Typography variant="body2" paragraph>
            Are you ready to prove your worth, Guardian? Step up to the
            challenge and master the Cryptarch Quiz!
          </Typography>
          {/* Close Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            sx={buttonStyle}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default HowToPlayModal;
