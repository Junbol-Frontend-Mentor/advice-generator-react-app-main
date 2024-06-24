import { useState } from 'react';
import Footer from './components/footer';
import { Box, Flex, Button } from '@chakra-ui/react'; // Importing Box from Chakra UI
import iconDice from './assets/images/icon-dice.svg'; // Importing the image
import { useBreakpointValue } from '@chakra-ui/react';

function App() {
  const [adviceId, setAdviceId] = useState(0);
  const [advice, setAdvice] = useState('');

  const width = useBreakpointValue({ base: '100%', md: '500px' });

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice'); // Correct API endpoint
      const data = await response.json();
      setAdviceId(data.slip.id); // ✅ Correctly updating the state
      setAdvice(data.slip.advice); // ✅ Correctly updating the state
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Flex
        width="100%"
        height="100vh" // Full viewport height
        flexDirection="column" // Arrange children in a column
        alignItems="center" // Center children vertically
        padding="2rem"
        bg="black" // Set background color for clarity
      >
        <Flex
          width={width} // Use responsive width
          position="relative"
          justifyContent="flex-start" // Center children horizontally
          alignItems="center" // Center children vertically
          flexDirection="column" // Arrange children in a column
          borderRadius="10px"
          padding="2rem"
          bg="hsl(217, 19%, 38%)" // Set background color for clarity
        >
          <Box width="100%" height="3rem" textAlign="center" textColor="hsl(150, 100%, 66%)" mb="2rem" fontSize="2rem" fontWeight={800}>
            Advice #<span>{adviceId}</span>
          </Box>
          <Box width="100%" textAlign="center" textColor="hsl(150, 100%, 66%)" fontSize="2rem" fontWeight={800} mb="2rem">
            {advice}
          </Box>
          <Button
            width="4rem"
            height="4rem"
            display="flex"
            position="absolute"
            bottom="-2rem" // ✅ 🚩Ensures the button is at the bottom
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
            bg="hsl(150, 100%, 66%)"
            _hover={{
              bg: 'hsl(200, 100%, 80%)',
              boxShadow: '0 0 20px 2px rgba(207, 245, 250, 0.8)',
            }}
            onClick={fetchData} // Event handler for click event
          >
            <img src={iconDice} alt="dice icon" />
          </Button>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default App;
