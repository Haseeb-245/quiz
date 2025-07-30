

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizSection = document.querySelector('.quiz-section');
    const resultsSection = document.querySelector('.results-section');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.querySelector('.options-container');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const timerElement = document.getElementById('time');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const correctAnswersElement = document.getElementById('correct-answers');
    const percentageElement = document.getElementById('percentage');
    const timeTakenElement = document.getElementById('time-taken');
    const resultsMessageElement = document.getElementById('results-message');
    const progressBar = document.querySelector('.progress-bar');
    
    // Audio Elements
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const clickSound = document.getElementById('click-sound');
    const completeSound = document.getElementById('complete-sound');
    
    // Quiz Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60;
    let quizCompleted = false;
    let startTime;
    let shuffledQuestions = [];
    
    // Sample Questions (Replace with your actual questions)
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            correctAnswer: 1
        },
        {
            question: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            correctAnswer: 3
        },
        {
            question: "What year was JavaScript launched?",
            options: ["1990", "1995", "2000", "2005"],
            correctAnswer: 1
        },
        {
            question: "What does HTML stand for?",
            options: [
                "Hypertext Markup Language",
                "Hypertext Markdown Language",
                "Hyperloop Machine Language",
                "Helicopters Terminals Motorboats Lamborginis"
            ],
            correctAnswer: 0
        },
        {
            question: "Which of these is a JavaScript package manager?",
            options: ["Node.js", "TypeScript", "npm", "React"],
            correctAnswer: 2
        },
        {
            question: "Which tool can you use to ensure code quality?",
            options: ["Angular", "jQuery", "ESLint", "Sass"],
            correctAnswer: 2
        },
        {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 2
        }
    ];
    
    // Initialize Quiz
    function startQuiz() {
        // Reset variables
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 60;
        quizCompleted = false;
        
        // Shuffle questions
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        
        // Update UI
        scoreElement.textContent = '0';
        totalQuestionsElement.textContent = shuffledQuestions.length;
        timerElement.textContent = '60';
        timerElement.style.color = '#ffd700';
        
        // Show quiz section, hide results
        quizSection.style.display = 'block';
        resultsSection.style.display = 'none';
        
        // Start timer and show first question
        startTime = new Date();
        startTimer();
        showQuestion();
    }
    
    // Display Question
    function showQuestion() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            endQuiz();
            return;
        }
        
        const question = shuffledQuestions[currentQuestionIndex];
        questionElement.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update progress
        progressBar.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;
        
        // Disable next button until an option is selected
        nextButton.disabled = true;
    }
    
    // Select Option
    function selectOption(selectedIndex) {
        if (quizCompleted) return;
        
        // Play click sound
        clickSound.currentTime = 0;
        clickSound.play();
        
        const question = shuffledQuestions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Lock all options
        options.forEach(option => option.classList.add('locked'));
        
        // Mark selected option
        options[selectedIndex].classList.add('selected');
        
        // Check if correct
        if (selectedIndex === question.correctAnswer) {
            options[selectedIndex].classList.add('correct');
            score++;
            scoreElement.textContent = score;
            correctSound.play();
        } else {
            options[selectedIndex].classList.add('wrong');
            // Also show correct answer
            options[question.correctAnswer].classList.add('correct');
            wrongSound.play();
        }
        
        // Enable next button
        nextButton.disabled = false;
    }
    
    // Next Question
    nextButton.addEventListener('click', () => {
        if (quizCompleted) return;
        
        clickSound.currentTime = 0;
        clickSound.play();
        
        currentQuestionIndex++;
        showQuestion();
    });
    
    // Timer
    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 10) {
                timerElement.style.color = '#ff6b6b';
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }
    
    // End Quiz
    function endQuiz() {
        quizCompleted = true;
        clearInterval(timer);
        
        // Calculate time taken
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        const timeUsed = Math.min(60 - timeLeft, 60);
        
        // Calculate percentage
        const percentage = Math.round((score / shuffledQuestions.length) * 100);
        
        // Update results
        correctAnswersElement.textContent = `${score}/${shuffledQuestions.length}`;
        percentageElement.textContent = `${percentage}%`;
        timeTakenElement.textContent = `${timeUsed}s`;
        
        // Set results message based on performance
        let message;
        if (percentage >= 80) {
            message = "Royal Performance! You've demonstrated exceptional knowledge worthy of the crown!";
        } else if (percentage >= 60) {
            message = "Noble Effort! You've shown commendable knowledge, keep striving for excellence!";
        } else if (percentage >= 40) {
            message = "Valiant Attempt! With more practice, you'll soon reach royal standards!";
        } else {
            message = "Court Jester! Fear not, even kings began as squires. Try again to improve!";
        }
        resultsMessageElement.textContent = message;
        
        // Play completion sound
        completeSound.play();
        
        // Show results, hide quiz
        quizSection.style.display = 'none';
        resultsSection.style.display = 'block';
    }
    
    // Restart Quiz
    restartButton.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
        startQuiz();
    });
    
    // Start the quiz initially
    startQuiz();
});