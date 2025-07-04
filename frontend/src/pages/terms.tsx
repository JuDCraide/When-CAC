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
        <h2><span>Termos de Uso</span></h2>
        <h3><span>1. Termos</span></h3>
        <p>
          <span>
            Ao acessar ao site <a href="https://when-cac.vercel.app/">When CAC</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais
            aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </span>
        </p>
        <h3><span>2. Uso de Licença</span></h3>
        <p>
          <span>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site When CAC , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma
            transferência de título e, sob esta licença, você não pode:
          </span>
        </p>
        <ol>
          <li><p><span>modificar ou copiar os materiais;</span></p></li>
          <li><p><span>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</span></p></li>
          <li><p><span>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site When CAC;</span></p></li>
          <li><p><span>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</span></p></li>
          <li><p><span>{"transferir os materiais para outra pessoa ou \'espelhe\' os materiais em qualquer outro servidor."}</span></p></li>
        </ol>
        <p>
          <span>
            Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por When CAC a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve
            apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
          </span>
        </p>
        <h3><span>3. Isenção de responsabilidade</span></h3>
        <ol>
          <li>
            <p><span>
              {"Os materiais no site da When CAC são fornecidos \'como estão\'. When CAC não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos."}
            </span></p>
          </li>
          <li>
            <p><span>
              Além disso, o When CAC não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites
              vinculados a este site.
            </span></p>
          </li>
        </ol>
        <h3><span>4. Limitações</span></h3>
        <p>
          <span>
            Em nenhum caso o When CAC ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar
            os materiais em When CAC, mesmo que When CAC ou um representante autorizado da When CAC tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias
            implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.
          </span>
        </p>
        <h3><span>5. Precisão dos materiais</span></h3>
        <p>
          <span>
            Os materiais exibidos no site da When CAC podem incluir erros técnicos, tipográficos ou fotográficos. When CAC não garante que qualquer material em seu site seja preciso, completo ou atual. When CAC pode fazer alterações nos
            materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, When CAC não se compromete a atualizar os materiais.
          </span>
        </p>
        <h3><span>6. Links</span></h3>
        <p>
          <span>
            O When CAC não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por When CAC do site. O uso de qualquer site vinculado é por
            conta e risco do usuário.
          </span>
        </p>
        <h3><span>Modificações</span></h3>
        <p><span>O When CAC pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</span></p>
        <h3><span>Lei aplicável</span></h3>
        <p><span>Estes termos e condições são regidos e interpretados de acordo com as leis do When CAC e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</span></p>
      </main>
    </div>
  );
}