import styles from "@/styles/Terms.module.css";
import bg from "../../public/images/bg-dark.png";
import Header from "@/components/Header";

export default function Policy() {
  return (
    <div
      className={styles.page}
      style={{
        backgroundImage: `linear-gradient(var(--darker-green), rgba(0, 0, 0, 0.5) ),url(${bg.src})`,
      }}
    >
      <Header home={true} checkHome={false} style={{
        background: `var(--darker-green)`,
      }}/>
      <main className={styles.main}>
        <h2><span>Política de Privacidade</span></h2>
        <p>
          <span>
            A sua privacidade é importante para nós. É política do When CAC respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://when-cac.vercel.app/">When CAC</a>, e outros sites que
            possuímos e operamos.
          </span>
        </p>
        <p>
          <span>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como
            será usado.
          </span>
        </p>
        <p>
          <span>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso,
            divulgação, cópia, uso ou modificação não autorizados.
          </span>
        </p>
        <p><span>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</span></p>
        <p>
          <span>
            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas&nbsp;
          </span>
          <a href="https://politicaprivacidade.com/" rel="noopener noreferrer" target="_blank">políticas de privacidade</a><span>.</span>
        </p>
        <p><span>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</span></p>
        <p>
          <span>
            O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em
            contacto connosco.
          </span>
        </p>
        <p><span></span></p>
        <h3><span>Compromisso do Usuário</span></h3>
        <p><span>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o When CAC oferece no site e com caráter enunciativo, mas não limitativo:</span></p>
        <ul>
          <li>
            <p><span>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</span></p>
          </li>
          <li>
            <p><span>
              B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
            </span></p>
          </li>
          <li>
            <p><span>
              C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do When CAC, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que
              sejam capazes de causar danos anteriormente mencionados.
            </span></p>
          </li>
        </ul>
        <h3><span>Aviso de Isenção de Responsabilidade</span></h3>
        <p><span>Este site é um projeto independente e não possui qualquer afiliação oficial com o canal <a href="https://www.youtube.com/@cadeachave">Cadê a chave?</a>, tampouco reivindica propriedade ou responsabilidade sobre seu conteúdo. Todo o material exibido foi utilizado exclusivamente para fins de entretenimento.</span></p>
        <p><span>Nenhum direito autoral é reivindicado sobre os conteúdos do canal, que pertencem aos seus respectivos criadores. Caso você seja o(a) detentor(a) dos direitos e deseje solicitar a remoção de qualquer conteúdo, entre em contato pelo e-mail: whencac@gmail.com. Atenderemos prontamente a solicitação.</span></p>
        <h3><span>Mais informações</span></h3>
        <p>
          <span>
            Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em
            nosso site.
          </span>
        </p>
        <h3><span>Fale Conosco</span></h3>
        <p><span>Se você tiver qualquer dúvida sobre esta Política de Privacidade, entre em contato conosco:</span></p>
        <ul>
          <li><span>Por e-mail: whencac@gmail.com</span></li>
        </ul>
        <p className={styles.noIdent}><span>Esta política é efetiva a partir de 30 de maio de 2025</span></p>
      </main>
    </div>
  );
}