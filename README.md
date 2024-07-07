# Pseudoword Generator for Czech

The Pseudoword Generator for the Czech language is a React-based web application designed to generate pseudowords based on phonotactic or orthotactic probability calculations. This tool is particularly useful for linguistic research, providing users with a way to take into account the phonotactic possibilities of Czech.

## Usage
After launching the application, you will be greeted with an interactive form where you can:

- **Set the Word Length**: Determines the length of each pseudoword.
- **Choose the Number of Words**: Specifies how many pseudowords to generate.
- **Define the Target Probability**: Sets the probability threshold for word generation.
- **Input Required Characters**: Allows setting specific characters at chosen positions in the word.
  
Fill in the desired parameters and click the 'Generate' button to produce pseudowords. The results, including each word and its corresponding probability, will be displayed below the form.

## Features

- **Dynamic Pseudoword Generation**: Users can generate pseudowords by specifying word length, number of words, and target probability.
- **Custom Character Input**: Allows for specific characters to be placed at certain positions in the word.
- **Probability Calculation**: Includes a module to calculate the phonotactic probability of generated words, based on user-selected data type (phonotactic or orthotactic).

## Components
- **Generator**: Handles the core logic of pseudoword generation, and manages state.
- **DataLoader**: Handles the loading of bigram data based on selected criteria.
- **InputForm**: Provides input fields for defining word generation parameters.
- **OutputDisplay**: Displays generated pseudowords and their probabilities.
- **BigramWeigher**: Calculates weights for bigrams to be used in word generation based on their probability.
- **ProbabilityCalculator**: Computes the probability of a generated word based on bigram frequencies.

## Methodology

The method for calculating phonotactic probability is based on the approach used by *Čechová et al. (2023)* for the Czech language. The calculations involve assessing the frequency and positional data of bigrams within a given word.

## Citation

If you use this application in your research or for other purposes, please cite both the application and the primary article:

- **Vokáčová, M.** (2024): Pseudorator: Pseudoword Generator for Czech (Version 1.0.1) [Computer software]. https://taaltool.github.io/pseudorator/
- **Čechová, P., Cilibrasi, L., Henyš, J., & Čecho, J.** (2023). Introducing a phonotactic probability calculator for Czech. *Naše Řeč*, 106(1), 72–83.


## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
