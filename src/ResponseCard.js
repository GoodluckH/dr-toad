import { Box, Text, VStack } from "@chakra-ui/react";
function ResponseCard({ prompt, response }) {
  return (
    <Box
      maxW="100%"
      borderWidth="3px"
      borderRadius="25"
      borderColor={"gray.200"}
      overflow="hidden"
      boxShadow="md"
      minH="10px"
      background={"gray.300"}
      padding="25px"
      mb={30}
    >
      <VStack align="flex-start">
        <Text fontSize="md" fontWeight="bold">
          Prompt:{" "}
        </Text>
        <Text>{prompt}</Text>
        <Text fontSize="md" fontWeight="bold">
          Response:{" "}
        </Text>
        <Text>{response}</Text>
      </VStack>
    </Box>
  );
}

export default ResponseCard;
