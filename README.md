![Logo do When CAC](https://raw.githubusercontent.com/JuDCraide/When-CAC/main/frontend/public/images/logo-no-bg.png)
# When CAC

Um jogo divertido e desafiador para os fãs do canal do YouTube **[Cadê a Chave?](https://www.youtube.com/@cadeachave)**. Teste seus conhecimentos e sua intuição tentando adivinhar o número do episódio e a data de publicação dos vídeos, baseando-se apenas na thumbnail e no título!

## 🎮 Como Jogar

O objetivo é simples: acumular o máximo de pontos ao longo de 5 rodadas, adivinhando duas informações sobre um vídeo sorteado:

1.  **Número do Episódio:** Analise a thumbnail e o título (com o número do episódio oculto) para deduzir qual é o episódio.
2.  **Data de Publicação:** Use sua memória e as pistas visuais para estimar quando o vídeo foi ao ar.

Após cada palpite, a resposta correta é revelada, e sua pontuação é calculada com base na sua precisão.

### Modos de Jogo
* **Aleatório:** Jogue uma partida com 5 vídeos selecionados aleatoriamente.
* **Com Seed:** Insira uma "seed" (semente) de um jogo anterior para jogar com os mesmos vídeos, ideal para desafiar amigos!

### Onde jogar
* **Site Web** - Jogue em https://when-cac.vercel.app/
* **Unity Android APKPure** - Baixe o apk em APKPure https://apkpure.com/p/com.JuliaDCraide.WhenCAC
* **Unity Android itch.io** - Baixe o apk pelo itch.io em https://judcraide.itch.io/when-cac
* **Unity Web** - Jogue em https://judcraide.itch.io/when-cac
* **Unity Windows** - Baixe o installer em https://judcraide.itch.io/when-cac ou baixe o zip com executável no mesmo link

## 🎯 Sistema de Pontuação

A pontuação máxima total é de **1000 pontos**, sendo 200 por rodada (100 para o episódio e 100 para a data). A pontuação é calculada com base na proximidade do seu palpite com a resposta correta.

### 📺 Pontuação por Episódio
A pontuação depende da diferença entre o episódio real e o que você chutou:
* **Acerto exato** → 100 pontos
* **Erro de até 10 episódios** → de 99 a 96 pontos (queda gradual)
* **Erro de 11 a 25 episódios** → de 95 a 85 pontos
* **Erro de 26 a 50 episódios** → de 85 a 70 pontos
* **Erro de 51 a 100 episódios** → de 70 a 50 pontos
* **Erro de 101 a 200 episódios** → de 50 a 25 pontos
* **Erro de 201 a 300 episódios** → de 25 a 10 pontos
* **Erro acima de 300 episódios** → 0 pontos

### 📅 Pontuação por Data
A pontuação depende da diferença de dias entre a data real e o seu palpite:
* **Erro de até 1 dia** → 100 pontos
* **Erro de até 3 dias** → 99 pontos
* **Erro de até 7 dias** → 98 pontos
* **Erro de 8 a 15 dias** → 97 a 96 pontos (queda gradual)
* **Erro de 16 a 31 dias** → 95 a 85 pontos
* **Erro de 32 a 91 dias** → 85 a 70 pontos
* **Erro de 92 a 183 dias** → 70 a 55 pontos
* **Erro de 184 a 365 dias** → 55 a 35 pontos
* **Erro acima de 1 ano e até 3 anos** → 35 a 15 pontos
* **Erro acima de 3 anos e até 5 anos** → 15 a 0 pontos
* **Erro acima de 5 anos** → 0 ponto

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas tanto no frontend quanto no backend:

* **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **Banco de Dados:** [MongoDB](https://www.mongodb.com/)
* **Scraper de Dados:** [Python](https://www.python.org/) com as bibliotecas `scrapetube` e `pymongo`.

## 🚀 Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) (ou npm)
* [Python](https://www.python.org/)
* Uma instância do MongoDB (local ou em um serviço como o MongoDB Atlas)

### 1. Backend e Frontend

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/JuDCraide/When-CAC.git](https://github.com/JuDCraide/When-CAC.git)
    cd When-CAC/frontend
    ```

2.  **Instale as dependências:**
    ```bash
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na pasta `frontend` baseado no arquivo `.template.env` e adicione a string de conexão do seu banco de dados MongoDB:
    ```
    DB_CONN_STRING="sua_string_de_conexao_mongodb"
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    yarn dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 2. Scraper (Coleta de Dados)

Os scripts para coletar e atualizar os dados dos vídeos estão na pasta `scraper`.

1.  **Navegue até a pasta do scraper:**
    ```bash
    cd ../scraper
    ```

2.  **Crie e ative um ambiente virtual (recomendado):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

3.  **Instale as dependências Python:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure as variáveis de ambiente:**
    Assim como no frontend, crie um arquivo `.env` e adicione a sua `DB_CONN_STRING`.

5.  **Execute os scripts:**
    * `scraper.py`: Para buscar novos vídeos do canal e obter suas informações.
    * `update_database.py`: Para inserir os vídeos coletados no banco de dados.

## 📂 Estrutura do Projeto

* **/frontend:** Contém todo o código da aplicação web feita em Next.js.
* **/scraper:** Scripts em Python responsáveis por coletar os dados dos vídeos do YouTube e popular o banco de dados.
* **/testPoints:** Scripts para visualizar e testar a lógica de pontuação do jogo.

## 👥 Autores

Este jogo foi desenvolvido com muito carinho por:

* **Júlia D. Craide:** [LinkedIn](https://www.linkedin.com/in/juliadcraide/) | [GitHub](https://github.com/JuDCraide)
* **Leonardo R. Gobatto:** [LinkedIn](https://www.linkedin.com/in/leonardorgobatto/) | [GitHub](https://github.com/lrgobatto)
