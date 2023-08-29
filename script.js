const startButton = document.getElementById('start-button');
const surveyForm = document.getElementById('survey-form');
const questionContainer = document.getElementById('question-container');
const resultPage = document.getElementById('result');
let currentQuestionIndex = 0;

const questions = [
  {
    id: "q1",
    text: "퇴근하거나 강의가 끝난 후, 무엇을 하시나요?",
    choices: [
      { text: "친구들과 놀러 간다", value: "E" },
      { text: "바로 집으로 향한다", value: "I" }
    ]
  },
  {
    id: "q2",
    text: "게임을 좋아하신다면 어떤 게임을 하시나요?",
    choices: [
      { text: "평소에 하던 게임만 한다", value: "S" },
      { text: "새로운 게임에 도전해 본다", value: "N" }
    ]
  },
  {
    id: "q3",
    text: "하는 게임이 있으시다면 그 게임의 전반적인 스토리를 다 보시나요?",
    choices: [
      { text: "게임의 전반적인 스토리를 다 봐야한다.", value: "N" },
      { text: "시간낭비다 스킵!", value: "S" }
    ]
  },
  {
    id: "q4",
    text: "어떤 종류의 플레이 스타일을 선호하시나요?",
    choices: [
      { text: "전략 세우는 것을 좋아한다.", value: "J" },
      { text: "즉흥 플레이 최고!", value: "P" }
    ]
  },
  {
    id: "q5",
    text: "같이 게임을 하던 친구가 급한 일이 생겨서 게임에 들어오지 못하는 상황일 때 어떻게 대처하시나요?",
    choices: [
      { text: "그러려니 이해한다.", value: "P" },
      { text: "그렇지만 나랑 약속했잖아!", value: "J" }
    ]
  },
  {
    id: "q6",
    text: "같이 게임을 했던 사람이 나중에도 같이 게임을 하자고 한다면?",
    choices: [
      { text: "거절한다.", value: "I" },
      { text: "같이한다.", value: "E" }
    ]
  },
  {
    id: "q7",
    text: "게임을 즐기면서 새로운 이야기나 세계에 빠져보고 싶으신가요?",
    choices: [
      { text: "네! 새로운 이야기는 언제나 흥미롭죠", value: "N" },
      { text: "아니요, 그런 건 관심 없어요.", value: "S" }
    ]
  },
  {
    id: "q8",
    text: "간혹 시간이 날 때 어떤 방식으로 리프레시하시나요?",
    choices: [
      { text: "밖으로 나가서", value: "E" },
      { text: "집에서", value: "I" }
    ]
  },
  {
    id: "q9",
    text: "스토리 결말이 새드 엔딩이라면?",
    choices: [
      { text: "나도 우울해진다 ㅠ.ㅠ", value: "F" },
      { text: "게임은 게임일 뿐 영향받지 않는다.", value: "T" }
    ]
  },
  {
    id: "q10",
    text: "게임에서 진 상황! 속상해하는 친구(상대)를 보면서 어떻게 행동하시나요?",
    choices: [
      { text: "위로해준다.", value: "F" },
      { text: "네가 못해서 진 건데!", value: "T" }
    ]
  },
  {
    id: "q11",
    text: "친구가 우울하다고 게임 현질을 했다고 한다면 어떻게 행동하실껀가요?",
    choices: [
      { text: "헉 어떤거 때문에 우울해?", value: "F" },
      { text: "어떤 게임에 현질했는데?", value: "T" }
    ]
  },
  {
    id: "q12",
    text: "게임을 하다가 아직 끝내지 못한 과제가 생각났다면?",
    choices: [
      { text: "얼른 게임을 끄고 과제를 시작.", value: "J" },
      { text: "내일 하지 뭐! ", value: "P" }
    ]
  }

];

const userAnswers = [];

function saveAnswer(questionId, answer) {
  const question = questions.find(q => q.id === questionId);
  if (question) {
    const mappedAnswer = question.choices.find(choice => choice.text === answer)?.value || answer;
    userAnswers.push({ questionId, answer: mappedAnswer });
    console.log(questionId, mappedAnswer);
  }
}

function toggleNextButton(enabled) {
  const nextButton = document.querySelector('.question-container button');
  nextButton.disabled = !enabled;
}

// 특정 id의 질문 가져오는 함수
function getQuestionById(id) {
  return questions.find(question => question.id === id);
}

function startSurvey() {
  startButton.style.display = 'none';
  surveyForm.style.display = 'block';

  // 메인 페이지에서 첫 번째 질문 보여주기
  renderQuestion(currentQuestionIndex);
}

function renderQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionContainer.innerHTML = `
    <div class="question">
      <p>${question.text}</p>
      ${question.choices.map(choice => `<label><input type="radio" name="answer" value="${choice.text}"> ${choice.text}</label>`).join('')}
      <button type="button" onclick="nextQuestion()">다음</button>
    </div>
  `;

  toggleNextButton(false);

  const answerInputs = document.querySelectorAll('input[name="answer"]');
  answerInputs.forEach(input => {
    input.addEventListener('change', () => {
      toggleNextButton(true);
    });
  });
}

function nextQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = document.querySelector(`input[name="answer"]:checked`);

  if (selectedAnswer) {
    const questionId = currentQuestion.id;
    const answer = selectedAnswer.value;
    saveAnswer(questionId, answer);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion(currentQuestionIndex);
    } else {
      questionContainer.style.display = 'none';
      calculateResult();
    }
  } else {
    alert('답변을 선택해주세요.');
  }
}

function calculateResult() {
  // 사용자의 답변 콘솔로 출력
  console.log("사용자의 답변:");
  console.log(userAnswers);

  // 여기에 결과 계산 로직 추가
  const resultText = "결과가 여기에 표시됩니다.";
  document.getElementById('result-text').textContent = resultText;
  resultPage.style.display = 'block';
}

// 메인 페이지에서 첫 번째 질문 보여주기
startSurvey();