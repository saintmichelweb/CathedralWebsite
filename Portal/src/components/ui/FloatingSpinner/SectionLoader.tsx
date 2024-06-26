import { Box, Spinner } from '@chakra-ui/react'

const SectionLoader = () => {
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        background: "rgba(255,255,255, 0.8)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        alignItems: "center",
        overflow: "hidden",
        margin: 0
        }}
      >
        <Spinner color='primary' size='xl' thickness='2px' />
      </Box>
    );
  }

  export default SectionLoader