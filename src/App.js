import {
  Container,
  Textarea,
  Text,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import ResponseCard from "./ResponseCard";

const data = (prompt) => {
  return {
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
};

function App() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() !== "") {
      setLoading(true);

      const result = await fetch(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
          },
          body: JSON.stringify(data(value)),
        }
      );
      const parsedJSON = await result.json();
      const response = parsedJSON.choices[0].text;
      const trimmedResponse = response.replace("\n", ""); //to get rid of the two line breakers

      responses.unshift([value, trimmedResponse]);
      setResponses(responses);
      setLoading(false);
      setValue("");
    }
  }

  return (
    <Container maxW={900}>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        mt={20}
        mb={1}
      >
        Dr. Toad
      </Text>
      <Text mb={10} fontWeight="bold" fontSize="2xl">
        An AI counsellor who listens
      </Text>

      <FormControl mb={10}>
        <form>
          <Textarea
            disabled={loading}
            value={value}
            placeholder="Tell me what's going on, how you feel, and I will try my best to help you."
            onChange={(e) => setValue(e.target.value)}
          />
          <Button isLoading={loading} mt={5} onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </FormControl>

      <Text mb={10} fontWeight="bold" fontSize="2xl">
        Responses{" "}
      </Text>
      {responses.map((pair, idx) => {
        return (
          <div key={idx}>
            <ResponseCard prompt={pair[0]} response={pair[1]} />
          </div>
        );
      })}
    </Container>
  );
}

export default App;
