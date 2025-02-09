# Hangman Game 🎮

This project is a Hangman game developed with React and TypeScript. Players try to guess words related to front-end development while avoiding too many mistakes.

## Technologies Used
- React
- TypeScript
- Tailwind CSS (for styling)

## How to Play
1. The game randomly selects a word from a predefined list.
2. The player must guess letters by pressing keys on the keyboard.
3. If the letter is in the word, it will appear in the correct position.
4. If the letter is not in the word, an error is counted.
5. The game ends when:
   - The player correctly guesses all the letters (Victory 🎉)
   - The player reaches the maximum number of errors (Defeat 😢)
6. After the game ends, the player can restart the match.

## Installation and Execution

1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/hangman-game.git
   ```
2. Navigate to the project folder:
   ```sh
   cd hangman-game
   ```
3. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
5. Open your browser and go to `http://localhost:3000`

## Project Structure
- `src/components/Hangman.tsx` - Main game component.
- `src/index.tsx` - Application entry point.
- `src/styles/global.css` - Global styles applied to the game.

## Future Improvements
- Add more word categories.
- Create a hint system to assist players.
- Implement mobile support with interactive buttons.
- Enhance the interface and animations.

