let user = {};  // Store name/email

// Step 1: Start quiz after user enters info
function startQuiz() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        alert("Please enter your name and email!");
        return;
    }

    user = { name, email }; // Save user info
    document.getElementById('userForm').style.display = 'none';   // Hide form
    document.getElementById('quizQuestions').style.display = 'block'; // Show quiz
}

// Step 2: Submit quiz and calculate score + review
function submitQuiz() {
    const answers = {
        q1: '4',
        q2: 'Paris',
        q3: 'Mars',
        q4: '30',
        q5: 'HTML',
        q6: '100',
        q7: 'East',
        q8: '7',
        q9: 'Pacific',
        q10: 'Cheetah'
    };

    let score = 0;
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = ''; // Clear previous review

    for (let q in answers) {
        const userAnswer = document.querySelector(`input[name="${q}"]:checked`);
        const li = document.createElement('li');

        if (userAnswer) {
            if (userAnswer.value === answers[q]) {
                score++;
                li.innerHTML = `<strong>${q}:</strong> Correct ✅ Your answer: ${userAnswer.value}`;
                li.style.color = 'green';
            } else {
                li.innerHTML = `<strong>${q}:</strong> Incorrect ❌ Your answer: ${userAnswer.value}, Correct answer: ${answers[q]}`;
                li.style.color = 'red';
            }
        } else {
            li.innerHTML = `<strong>${q}:</strong> No answer selected ❌ Correct answer: ${answers[q]}`;
            li.style.color = 'red';
        }

        reviewList.appendChild(li);
    }

    // Save score in localStorage
    let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scores.push({
        name: user.name,
        email: user.email,
        score: score,
        date: new Date().toLocaleString() // timestamp
    });
    localStorage.setItem('quizScores', JSON.stringify(scores));

    // Show result
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('scoreDisplay').innerText = score;
}

// Step 3: Go to scores page
function goToScores() {
    window.location.href = 'scores.html';
}
