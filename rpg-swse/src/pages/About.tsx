export function About() {
  return (
    <div className="about-page">
      <h1>C.R.I.S. Star Wars Saga Edition</h1>
      <p className="subtitle">Character Registry & Integrated System</p>

      <div className="about-content">
        <section>
          <h2>Sobre o Projeto</h2>
          <p>
            Este é um sistema de fichas digitais para <strong>Star Wars Saga Edition</strong>,
            inspirado no C.R.I.S. (Ordem Paranormal). O objetivo é oferecer uma experiência
            moderna e interativa para gerenciar personagens, com cálculos automáticos,
            rolagem de dados e uma interface limpa e responsiva — tudo 100% offline.
          </p>
        </section>

        <section>
          <h2>Star Wars Saga Edition</h2>
          <p>
            Star Wars Saga Edition é um sistema de RPG publicado pela Wizards of the Coast
            em 2007, que permite aos jogadores criarem seus próprios personagens e aventuras
            no universo expandido de Star Wars. O sistema utiliza d20 e apresenta classes,
            talentos, perícias e a Força como mecânicas principais.
          </p>
        </section>

        <section>
          <h2>Funcionalidades</h2>
          <ul>
            <li>Criação de personagens com wizard passo a passo</li>
            <li>16 espécies jogáveis com modificadores raciais automáticos</li>
            <li>5 classes heroicas com perícias de classe exclusivas</li>
            <li>Cálculo automático de defesas, HP e modificadores de perícia</li>
            <li>Rolagem de dados integrada (d4, d6, d8, d10, d12, d20, d100)</li>
            <li>Condição (Condition Track) visual e interativa</li>
            <li>Sistema de autenticação local com múltiplos perfis</li>
            <li>100% offline — seus dados ficam salvos no seu navegador</li>
          </ul>
        </section>

        <section>
          <h2>Aviso Legal</h2>
          <p>
            Este é um projeto <strong>fan-made</strong> e sem fins lucrativos.
            Star Wars é propriedade da Lucasfilm Ltd. & Disney. Star Wars Saga Edition
            é propriedade da Wizards of the Coast. Nenhum material oficial está hospedado
            neste sistema — apenas referências às regras para facilitar o jogo.
          </p>
        </section>
      </div>
    </div>
  );
}
