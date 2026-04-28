# 📻 Morse Ops - Terminal

O **Morse Ops** é um simulador interativo de telégrafo e um jogo de desafio de velocidade. O objetivo é transmitir palavras em código Morse o mais rápido possível para subir no ranking global de operadores.

![Linguagens](https://img.shields.io/badge/Linguagens-HTML%20%7C%20CSS%20%7C%20JS-blue)

---

## 🚀 Funcionalidades

* **Simulador de Telégrafo:** Botão interativo que simula uma chave de rádio real com sons de oscilador senoidal.
* **Tradução em Tempo Real:** Converte sinais táteis (pontos e traços) em letras automaticamente.
* **Sistema de Voz (TTS):** O terminal fala a letra traduzida para confirmar a transmissão.
* **Desafio de Velocidade:** Sorteio de palavras aleatórias com cronômetro de precisão.
* **Ranking (Scoreboard):** Armazenamento local dos melhores tempos e pontuações (XP).
* **Design Profissional:** Interface tática baseada em *Midnight Design* com alta legibilidade.

---

## 🎮 Como Jogar

1.  **Identificação:** Insira seu nome no campo "ID DO OPERADOR".
2.  **Iniciar:** Clique em "INICIAR SEQUÊNCIA" para receber uma palavra alvo.
3.  **Transmissão:**
    * **Ponto (.)**: Um clique rápido no botão central.
    * **Traço (-)**: Segure o botão por mais de 200ms.
4.  **Tradução:** Aguarde 0.7 segundos após bater o código de uma letra para que o sistema a processe.
5.  **Objetivo:** Complete a palavra alvo no menor tempo possível para ganhar mais XP!

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Layout moderno com variáveis, Flexbox e animações de transição.
* **JavaScript (Vanilla):** * `Web Audio API` para geração de tons de rádio.
    * `SpeechSynthesis` para a voz do terminal.
    * `LocalStorage` para persistência do ranking.