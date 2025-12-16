/* GH-900 Simulator App (PT-BR) */
(function(){
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') || 'exam'; // 'exam' or 'gabarito'
  const dataSrc = document.body.getAttribute('data-src');
  const container = document.getElementById('app');
  const header = document.getElementById('header');

  if(!dataSrc){
    container.innerHTML = '<p>Erro: fonte de dados não definida.</p>';
    return;
  }

  fetch(dataSrc)
    .then(r => r.json())
    .then(data => init(data))
    .catch(err => {
      container.innerHTML = '<p>Falha ao carregar dados: ' + err + '</p>';
    });

  function init(data){
    header.querySelector('h1').textContent = data.title + (mode==='gabarito' ? ' – Gabarito' : '');
    if(mode === 'gabarito'){
      renderGabarito(data);
    } else {
      renderExam(data);
    }
  }

  function renderExam(data){
    const duration = (data.duration_minutes || 90) * 60; // seconds
    let remaining = duration;
    let timerId; 

    const timerEl = document.createElement('div');
    timerEl.className = 'timer';
    container.appendChild(timerEl);

    const form = document.createElement('form');
    form.id = 'exam-form';

    data.questions.forEach((q, idx) => {
      const qEl = document.createElement('div');
      qEl.className = 'question';
      const qTitle = document.createElement('h3');
      qTitle.textContent = `Q${idx+1}. ${q.q}`;
      const qTopic = document.createElement('div');
      qTopic.className = 'topic';
      qTopic.textContent = q.topic;
      qEl.appendChild(qTitle);
      qEl.appendChild(qTopic);

      q.options.forEach((opt, oi) => {
        const line = document.createElement('label');
        line.className = 'option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q_${idx}`;
        input.value = oi;
        line.appendChild(input);
        const span = document.createElement('span');
        span.textContent = opt;
        line.appendChild(span);
        qEl.appendChild(line);
      });
      form.appendChild(qEl);
    });

    const actions = document.createElement('div');
    actions.className = 'actions';
    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.textContent = 'Enviar prova';
    submitBtn.className = 'primary';
    actions.appendChild(submitBtn);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = 'Limpar respostas';
    resetBtn.className = 'secondary';
    actions.appendChild(resetBtn);

    container.appendChild(form);
    container.appendChild(actions);

    function formatTime(s){
      const m = Math.floor(s/60);
      const sec = s % 60;
      return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
    }

    function tick(){
      remaining -= 1;
      timerEl.textContent = `Tempo restante: ${formatTime(remaining)}`;
      if(remaining <= 0){
        clearInterval(timerId);
        submit();
      }
    }

    timerEl.textContent = `Tempo restante: ${formatTime(remaining)}`;
    timerId = setInterval(tick, 1000);

    resetBtn.addEventListener('click', () => {
      form.reset();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    submitBtn.addEventListener('click', submit);

    function submit(){
      clearInterval(timerId);
      const answers = [];
      let score = 0;
      data.questions.forEach((q, idx) => {
        const sel = form.querySelector(`input[name=q_${idx}]:checked`);
        const chosen = sel ? parseInt(sel.value, 10) : null;
        answers.push(chosen);
        const qEl = form.children[idx];
        const allOpts = qEl.querySelectorAll('label.option');
        allOpts.forEach((label, oi) => {
          label.classList.remove('correct','wrong');
          if(oi === q.answer){
            label.classList.add('correct');
          }
          if(chosen !== null && oi === chosen && chosen !== q.answer){
            label.classList.add('wrong');
          }
        });
        if(chosen === q.answer){ score += 1; }
        const expl = document.createElement('div');
        expl.className = 'explanation';
        expl.innerHTML = `<strong>Explicação:</strong> ${q.explanation}`;
        qEl.appendChild(expl);
      });
      const total = data.questions.length;
      const pct = Math.round((score/total)*100);
      const resultBox = document.createElement('div');
      resultBox.className = 'result';
      resultBox.innerHTML = `<h2>Resultado</h2><p>Acertos: <strong>${score}</strong> de ${total} (${pct}%).</p>`;
      container.insertBefore(resultBox, form);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  function renderGabarito(data){
    const list = document.createElement('div');
    list.className = 'gabarito';
    data.questions.forEach((q, idx) => {
      const qEl = document.createElement('div');
      qEl.className = 'question';
      const qTitle = document.createElement('h3');
      qTitle.textContent = `Q${idx+1}. ${q.q}`;
      const qTopic = document.createElement('div');
      qTopic.className = 'topic';
      qTopic.textContent = q.topic;
      qEl.appendChild(qTitle);
      qEl.appendChild(qTopic);

      q.options.forEach((opt, oi) => {
        const line = document.createElement('div');
        line.className = 'option ' + (oi === q.answer ? 'correct' : '');
        line.textContent = opt + (oi === q.answer ? ' ← correta' : '');
        qEl.appendChild(line);
      });
      const expl = document.createElement('div');
      expl.className = 'explanation';
      expl.innerHTML = `<strong>Explicação:</strong> ${q.explanation}`;
      qEl.appendChild(expl);
      list.appendChild(qEl);
    });
    container.appendChild(list);
  }
})();
