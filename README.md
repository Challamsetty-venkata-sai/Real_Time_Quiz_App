
# Real Time Quiz App

**A brief description of what this project does and who it's for**

The Quiz App is a React.js-based application designed to provide an engaging quiz experience. It leverages the useReducer hook for state management and includes a countdown timer that ensures automatic submission when time runs out. A fake JSON server is used as the backend to store quiz questions.

## Table Of Contents
1.Features

2.Technologies Used

3.Working Process

4.Installation & Set up

## 1.Features

* Interactive quiz interface with multiple questions.

* Countdown timer that automatically submits the quiz when time expires.

* Efficient state management using the useReducer hook.

* Fetches quiz data from a fake JSON server.

* Real-time feedback and scoring system.
## 2.Technologies Used
* **HTML** for layout design

* **CSS** for styling and also for responsive design. 

* **Bootstrap** is css frame work used for styling elements.

* **JavaScript** for adding functionality to the elements.

* **React Js** In React Js we actualy used useReducer hook for handling complex statemanagement.

* **Fake JSON** for creation of fake server.



## 3.Working Process
* The app loads 20 multiple-choice questions from the JSON server.

* Each question has assigned marks, which are awarded only when the correct option is chosen.

* A countdown timer is displayed, indicating the remaining time for the quiz.

* If the user completes the quiz before time runs out, they can submit their answers manually.

* If time runs out, the quiz is automatically submitted.

* After submission, the total score is calculated and displayed.

* The user has the option to restart the quiz and attempt it again.
## 4. Deployment

1.Clone the repository:

```bash
  git clone https://github.com/Challamsetty-venkata-sai/Real_Time_Quiz_App.git
```

2.Navigate to the project directory:

```bash
   cd src
```
3.install all dependecies:

```bash
   npm i
```

4,Creation of fake json server:

 * Create a db.json file in the root directory.

* Add sample quiz questions:
```bash
   {
  "questions": [
    {
      "id": 1,
      "question": "What is React?",
      "options": ["Library", "Framework", "Language"],
      "answer": "Library",
      "marks": 5
    }
  ]
}


```
* start the json server


5.Start The development server:

```bash
   npm start
```
