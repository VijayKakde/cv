class TerminalPortfolio {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('commandInput');
        this.cursor = document.getElementById('cursor');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentCommand = '';
        
        this.commands = {
            home: this.showHome.bind(this),
            about: this.showAbout.bind(this),
            education: this.showEducation.bind(this),
            projects: this.showProjects.bind(this),
            contact: this.showContact.bind(this),
            help: this.showHelp.bind(this),
            clear: this.clearScreen.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.showWelcome();
        this.setupEventListeners();
        this.updateCursor();
    }
    
    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });
        
        this.input.addEventListener('input', () => {
            this.updateCursor();
        });
        
        // Focus input when clicking anywhere
        document.addEventListener('click', () => {
            this.input.focus();
        });
        
        // Handle mobile touch
        document.addEventListener('touchstart', () => {
            this.input.focus();
        });
    }
    
    updateCursor() {
        const inputRect = this.input.getBoundingClientRect();
        const textWidth = this.getTextWidth(this.input.value);
        const promptWidth = this.getTextWidth('vijaykakde@portfolio:~$ ');
        
        this.cursor.style.left = `${promptWidth + textWidth}px`;
    }
    
    getTextWidth(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '16px VT323';
        return context.measureText(text).width;
    }
    
    showWelcome() {
        const headerBox  = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║                Welcome to Vijaykumar Kakde's Terminal Portfolio               ║
║                                                                               ║     
║                     AI & Data Science Developer                               ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
`;
const animatedMessage = `

System initialized successfully...
Terminal ready for commands.

Type 'help' to see available commands.
Type 'home' to get started.

`;
        this.addOutput(headerBox);
        this.typeWriter(animatedMessage, 50, 10);
    }
    
    handleCommand() {
        const command = this.input.value.trim().toLowerCase();
        
        if (command === '') return;
        
        this.addToHistory(command);
        this.addOutput(`vijaykakde@portfolio:~$ ${command}`);
        
        if (this.commands[command]) {
            this.commands[command]();
        } else {
            this.addOutput(`bash: ${command}: command not found\nType 'help' for available commands.`, 'error');
        }
        
        this.input.value = '';
        this.updateCursor();
    }
    
    addToHistory(command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        } else {
            this.input.value = this.commandHistory[this.historyIndex];
        }
        
        this.updateCursor();
    }
    
    addOutput(text, className = '') {
        const div = document.createElement('div');
        div.className = `command-output ${className}`;
        div.textContent = text;
        this.output.appendChild(div);
        this.scrollToBottom();
    }
    
    typeWriter(text, speed = 80) {
        const div = document.createElement('div');
        div.className = 'command-output';
        this.output.appendChild(div);
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                div.textContent += text.charAt(i);
                i++;
                this.scrollToBottom();
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    showHome() {
        const homeText = `
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   HOME                                      │
└─────────────────────────────────────────────────────────────────────────────┘

Hi, I'm Vijaykumar Tolaji Kakde! 👋

A passionate final-year B.E. student in Artificial Intelligence and Data Science
from Dr. D. Y. Patil Institute of Engineering, Management & Research, Pune.

I love building intelligent solutions using Python, Data Science, and Machine Learning.

🚀 Currently exploring: Advanced ML algorithms, Deep Learning, and Data Analytics
🎯 Goal: To create impactful AI solutions that solve real-world problems
💡 Interests: Machine Learning, Data Science, Web Development, and Open Source

`;
        this.typeWriter(homeText, 5);
    }
    
    showAbout() {
    const aboutText = `
┌──────────────────────────────────────────────────────────────────────────────┐
│                             [ ACCESS GRANTED ]                               │
└──────────────────────────────────────────────────────────────────────────────┘

> Initializing identity sequence...
> Accessing encrypted profile of user: VIJAYKAKDE
> Decryption complete. Rendering data:

{   "username":     "vijaykakde",
    "role":         "AI/ML Developer & Data Scientist",
    "status":       "Active",
    "location":     "Pune, India",
    "languages":    ["English", "Hindi", "Marathi"],
    "skills":       [
                        "Python", 
                        "Machine Learning", 
                        "Data Science", 
                        "ReactJS",
                        "Tailwind CSS",
                        "Vite + TS",
                        "Problem Solving",
                        "Power BI"
                    ],
    "interests":    ["AI", "Deep Learning", "Web Dev", "Cyber UI Design"],
    "experience":   "Data Analyst Intern - Shubhasairaj Infotech (Dec 2024 - Jan 2025)"
}

> Tip: Type 'projects' to view mission logs.
    `;
    this.typeWriter(aboutText, 10, 1);
}

    
    showEducation() {
    const educationText = `
┌────────────────────────────────────────────────────────────┐
│                        EDUCATION                           │
└────────────────────────────────────────────────────────────┘

+------------+---------------------------------------------+----------+
| Year       | Institute                                   | Result   |
+------------+---------------------------------------------+----------+
| 2022–2026  | D.Y. Patil Institute of Engg., Pune         | CGPA: 7.42 |
| 2021       | Rajarshee Shahu Jr. College, Nanded         | 92%      |
| 2019       | Pratibha Niketan High School, Nanded        | 88.80%   |
+------------+---------------------------------------------+----------+

📚 Courses: ML, AI, Data Mining, DSA, Statistics, DBMS
    `;
    this.typeWriter(educationText, 10, 1);
}

    
    showProjects() {
        const projectsText = `
┌─────────────────────────────────────────────────────────────────────────────┐
│                                PROJECTS                                     │
└─────────────────────────────────────────────────────────────────────────────┘

🏠 Bangalore House Price Prediction
   ➤ Predict house prices based on location, size, and amenities using ML
   ➤ Technologies: Python, Scikit-learn, Pandas, NumPy, Flask
   ➤ GitHub: https://github.com/VijayKakde/Bangalore-House-Price-Prediction-

❤️  Heart Disease Prediction
   ➤ Predict heart disease risk using various ML algorithms
   ➤ Technologies: Python, ML Algorithms, Data Visualization
   ➤ GitHub: https://github.com/VijayKakde/Heart_Disease_Prediction

🌱 Plant Disease Prediction
   ➤ Detect plant leaf diseases using Machine Learning and Deep Learning
   ➤ Technologies: Python, TensorFlow, CNN, Image Processing
   ➤ GitHub: https://github.com/VijayKakde/Plant_disease_prediction

📊 Data Analysis Projects
   ➤ Various data analysis and visualization projects
   ➤ Technologies: Python, Pandas, Matplotlib, Power BI
   ➤ Focus: Extracting insights from complex datasets

🔗 All projects are available on my GitHub profile with detailed documentation
   and implementation guides.

`;
        this.typeWriter(projectsText, 5);
    }
    
    showContact() {
    const contactText = `
┌──────────────────────────────────────────────────────────────────────────────┐
│                     [ ENCRYPTED MESSAGING RELAY v3.9.7 ]                     │
└──────────────────────────────────────────────────────────────────────────────┘

>>> INITIALIZING RELAY NODE...
>>> Syncing keys... OK
>>> Decrypting message payload...
>>> Identity trace: #0xVJK-77 AUTHORIZED
>>> Opening secure communication window...

╭────────────────────────────────────────────────────╮
│  📧 EMAIL            : vijaykumarkakde77@gmail.com │
│  📱 PHONE            : +91-8857941208              │
│  🔗 GITHUB           : github.com/VijayKakde       │
│  💼 LINKEDIN         : linkedin.com/in/vijaykakde  │
│  🌐 PORTFOLIO        : portfoliocv-1l1.pages.dev   │
╰────────────────────────────────────────────────────╯

>>> Awaiting message input...


`;
    this.typeWriter(contactText, 10, 1);
}

    
    showHelp() {
        const helpText = `
┌─────────────────────────────────────────────────────────────────────────────┐
│                            AVAILABLE COMMANDS                               │
└─────────────────────────────────────────────────────────────────────────────┘

📝 Navigation Commands:

   home        - Show welcome message and brief introduction
   about       - Display detailed information about me and my skills
   education   - Show my educational background and qualifications
   projects    - List my key projects with descriptions and links
   contact     - Display my contact information and social links
   help        - Show this help message with all available commands
   clear       - Clear the terminal screen

⌨️  Terminal Tips:
   • Use ↑/↓ arrow keys to navigate command history
   • Commands are case-insensitive
   • Type any command and press Enter to execute
   • Click anywhere to focus the input field

🎯 Quick Start:
   Try typing 'home' to get started, then explore other sections!

`;
        this.typeWriter(helpText, 5);
    }
    
    clearScreen() {
        this.output.innerHTML = '';
        this.addOutput('Screen cleared. Type \'help\' for available commands.');
    }
}

// Initialize the terminal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TerminalPortfolio();
});

// Prevent right-click context menu for more authentic terminal feel
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle window resize
window.addEventListener('resize', () => {
    const terminal = document.querySelector('.terminal-portfolio');
    if (terminal) {
        terminal.updateCursor();
    }
});