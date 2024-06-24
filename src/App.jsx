import { useState } from 'react';
import { Box, Flex, Button, useBreakpointValue } from '@chakra-ui/react';
import Footer from './components/Footer';
import iconDice from './assets/images/icon-dice.svg'; // Importing the image

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
    <Flex
      direction="column" // 🟢  the flex direction is column
      align="center" // 🟢 Center items horizontally
      minH="100vh" // 🟢 Full viewport height
      bg="black"
      py="2rem" // 🟢 Add padding to the container
    >
      <Flex
        direction="column" // 🟢 Ensure the flex direction is column
        align="center" // 🟢 Center items horizontally
        width={width}
        bg="hsl(217, 19%, 38%)"
        borderRadius="10px"
        p="2rem"
        mb="5rem"
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
          position="relative"
          bottom="-4rem" // ✅ Ensures the button is at the bottom
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
      <Footer /> {/* 🟢 Footer is placed just below the content */}
    </Flex>
  );
}

export default App;
