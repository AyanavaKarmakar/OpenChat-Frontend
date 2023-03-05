import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useLoadingStore } from "../../stores";

export const LoadingAnimation = () => {
  const loading = useLoadingStore();

  if (loading.isLoading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return <></>;
};
