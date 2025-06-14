document.getElementById('font-select').addEventListener('change', function () {
    document.body.style.fontFamily = this.value;
  });
  
  document.getElementById('dark-mode-toggle').addEventListener('change', function () {
    document.body.classList.toggle('dark');
  });
  
  function searchWord() {
    const word = document.getElementById('word-input').value;
    if (!word) return;
  
    // Fix: Use backticks `` and correct URL
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => res.json())
      .then(data => {
        const entry = data[0];
        const result = document.getElementById('result');
        const phonetic = entry.phonetic || entry.phonetics[0]?.text || '';
        const audio = entry.phonetics.find(p => p.audio)?.audio || '';
        const meaning = entry.meanings[0];
        const defList = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
  
        result.innerHTML = `
          <h2>${entry.word} 
            ${audio ? `<button onclick="playAudio('${audio}')">▶</button>` : ''}
          </h2>
          <p><i>${phonetic}</i></p>
          <h3>${meaning.partOfSpeech}</h3>
          <ul>${defList}</ul>
        `;
      })
      .catch(() => {
        document.getElementById('result').innerHTML = '<p>Word not found!</p>';
      });
  }
  
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }
  