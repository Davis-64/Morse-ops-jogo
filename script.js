const dicionario = { ".-":"A", "-...":"B", "-.-.":"C", "-..":"D", ".":"E", "..-.":"F", "--.":"G", "....":"H", "..":"I", ".---":"J", "-.-":"K", ".-..":"L", "--":"M", "-.":"N", "---":"O", ".--.":"P", "--.-":"Q", ".-.":"R", "...":"S", "-":"T", "..-":"U", "...-":"V", ".--":"W", "-..-":"X", "-.--":"Y", "--..":"Z" };
const palavrasDesafio = ["ALFA", "BRAVO", "CHARLIE", "DELTA", "ECHO", "FOX", "GOLF", "HOTEL", "INDIA", "JULIET"];

let tempoInicioSinal = 0, tempoInicioJogo = 0, morseAcumulado = "", textoTraduzido = "", timerPausa, somAtual = null, palavraAtual = "", jogoAtivo = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Elementos
const btnTelegrafo = document.getElementById('telegrafo-btn');
const displayTexto = document.getElementById('display-texto');
const morseTemp = document.getElementById('morse-temp');
const cronometro = document.getElementById('cronometro');

function iniciarNovoJogo() {
    const nome = document.getElementById('nome-jogador').value;
    if(!nome) { alert("ERRO: OPERADOR NÃO IDENTIFICADO"); return; }
    palavraAtual = palavrasDesafio[Math.floor(Math.random() * palavrasDesafio.length)];
    document.getElementById('palavra-alvo').innerText = palavraAtual;
    limparCamposTexto();
    document.getElementById('jogo-area').style.display = "block";
    jogoAtivo = true; tempoInicioJogo = Date.now();
    atualizarCronometro();
}

function limparCamposTexto() {
    textoTraduzido = ""; morseAcumulado = "";
    displayTexto.innerText = "";
    morseTemp.innerText = "";
}

function resetarTudo() {
    jogoAtivo = false;
    document.getElementById('jogo-area').style.display = "none";
    limparCamposTexto();
}

function atualizarCronometro() {
    if(!jogoAtivo) return;
    cronometro.innerText = ((Date.now() - tempoInicioJogo) / 1000).toFixed(1);
    setTimeout(atualizarCronometro, 100);
}

function tocarSom() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine"; osc.frequency.value = 700;
    osc.connect(gain); gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.start();
    return { osc, gain };
}

function iniciarPressionado(e) {
    if(e) e.preventDefault();
    if(!jogoAtivo) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (!somAtual) {
        tempoInicioSinal = Date.now();
        somAtual = tocarSom();
        btnTelegrafo.classList.add('pressionado');
        clearTimeout(timerPausa);
    }
}

function finalizarPressionado() {
    if (!somAtual || !jogoAtivo) return;
    const duracao = Date.now() - tempoInicioSinal;
    somAtual.osc.stop(); somAtual = null;
    btnTelegrafo.classList.remove('pressionado');
    morseAcumulado += (duracao < 200) ? "." : "-";
    morseTemp.innerText = morseAcumulado;
    timerPausa = setTimeout(traduzirLetra, 700);
}

function traduzirLetra() {
    if (!morseAcumulado) return;
    const letra = dicionario[morseAcumulado] || "?";
    textoTraduzido += letra;
    displayTexto.innerText = textoTraduzido;
    morseAcumulado = ""; morseTemp.innerText = "";
    
    const msg = new SpeechSynthesisUtterance(letra);
    msg.lang = 'pt-BR'; window.speechSynthesis.speak(msg);
    verificarVitoria();
}

function verificarVitoria() {
    if (textoTraduzido === palavraAtual) {
        jogoAtivo = false;
        const pontos = Math.round((palavraAtual.length / ((Date.now() - tempoInicioJogo) / 1000)) * 1000);
        salvarNoRank(pontos);
        alert("MISSÃO CUMPRIDA! PONTOS: " + pontos);
    } else if (textoTraduzido.length >= palavraAtual.length) {
        limparCamposTexto();
    }
}

function salvarNoRank(pontos) {
    const nome = document.getElementById('nome-jogador').value;
    let rank = JSON.parse(localStorage.getItem('rankMorsePro') || "[]");
    rank.push({ nome, pontos });
    rank.sort((a, b) => b.pontos - a.pontos);
    localStorage.setItem('rankMorsePro', JSON.stringify(rank.slice(0, 5)));
    atualizarTabela();
}

function atualizarTabela() {
    const rank = JSON.parse(localStorage.getItem('rankMorsePro') || "[]");
    document.getElementById('corpo-rank').innerHTML = rank.map((item, i) => 
        `<tr><td style="color:#e2e8f0">${i+1}. ${item.nome}</td><td style="color:#00ff94; text-align:right">${item.pontos} XP</td></tr>`
    ).join('');
}

// Event Listeners
document.getElementById('btn-iniciar').addEventListener('click', iniciarNovoJogo);
document.getElementById('btn-abortar').addEventListener('click', resetarTudo);
btnTelegrafo.addEventListener('mousedown', iniciarPressionado);
btnTelegrafo.addEventListener('mouseup', finalizarPressionado);
btnTelegrafo.addEventListener('touchstart', iniciarPressionado);
btnTelegrafo.addEventListener('touchend', finalizarPressionado);

atualizarTabela();