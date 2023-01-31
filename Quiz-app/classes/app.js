window.onload =()=>{

  const quizData1 = [
    
    new Question(
      'Which one is not an object oriented programming langauge?',
      'd',
      new Answer('Java', 'C#', 'C++', 'C')
    ),
    new Question(
      'Which language is used for styling web pages?',
      'c',
      new Answer('HTML', 'JQuery', 'CSS', 'XML')
    ),

  ];
   
  const quizData2 = [

    new Question(
      'There are ___ main components of object oriented programming.?',
      'd',
      new Answer('1', '6', '2', '4')
    ),
    new Question(
      'Which langauge is used for web apps?',
      'd',
      new Answer('PHP', 'Python', 'JavaScript', 'All')
    ),
  ];

  localStorage.setItem('allQuizData', JSON.stringify({ quizData1, quizData2 }));

  // Retrieve quiz data from local storage
  const retrievedQuizData = JSON.parse(localStorage.getItem('allQuizData'));

   
  const quiz = document.querySelector('#quiz');
  const answerEls = document.querySelectorAll('.answer');
  const questionEl = document.querySelector('#question');
  const a_text = document.querySelector('#a_text');
  const b_text = document.querySelector('#b_text');
  const c_text = document.querySelector('#c_text');
  const d_text = document.querySelector('#d_text');
  const submitBtn = document.querySelector('#submit');
  const quiz1Btn = document.querySelector('#quiz1-btn');
  const quiz2Btn = document.querySelector('#quiz2-btn');
   
  let currentQuiz = 0
  let score = 0;

  let currentQuizData = quizData1;

  const loadQuiz =()=>{
    deselectAnswers();

    
  if (quiz1Btn.classList.contains('active')) {
    currentQuizData = retrievedQuizData.quizData1;
  } else if (quiz2Btn.classList.contains('active')) {
    currentQuizData = retrievedQuizData.quizData2;
  }

   
    let currentQuestionData = currentQuizData[currentQuiz];
    let answers = currentQuestionData.answers;

    questionEl.innerText = currentQuestionData.question;
    a_text.innerText = answers.a;
    b_text.innerText = answers.b;
    c_text.innerText = answers.c;
    d_text.innerText = answers.d;
   
  };
   
  const deselectAnswers=()=>{
    answerEls.forEach(answerEl=>answerEl.checked = false)
  };
   
  loadQuiz();
   
 
  const getSelected=()=> {
    let answer;
    answerEls.forEach(answerEl => {
      if(answerEl.checked) {
        answer = answerEl.id;
      }
    });
    return answer;
  };

 submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if(answer) {
    if(answer === currentQuizData[currentQuiz].correctAnswer) {
      score++;
    }
    currentQuiz++;
    if(currentQuiz < currentQuizData.length) {
      loadQuiz();
    } else {
      let quizLength = quizData1.length;
      if (quiz2Btn.classList.contains('active')) {
        quizLength = quizData2.length;
      }
      quiz.innerHTML = `
      <h2>You answered ${score}/${quizLength} questions correctly</h2>
      <button onclick="location.reload()" class="btn btn-warning">Reload</button>
      `;
    }
  }
});


  quiz1Btn.addEventListener('click', () => {
    currentQuizData = quizData1;
    currentQuiz = 0;
    score = 0;
    loadQuiz();
    quiz1Btn.classList.add('active');
    quiz2Btn.classList.remove('active');
  });

  quiz2Btn.addEventListener('click', () => {
    currentQuizData = quizData2;
    currentQuiz = 0;
    score = 0;
    loadQuiz();
    quiz2Btn.classList.add('active');
    quiz1Btn.classList.remove('active');
  });
 

};