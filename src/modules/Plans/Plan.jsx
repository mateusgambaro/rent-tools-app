import React from "react";
import "./styles.css";
import PlanCard from "../../components/PlanCard";
import construction from '../../assets/construction.svg'
import home from '../../assets/home.svg'
import garden from '../../assets/garden.svg'

const Plan = () => {
  return (
    <div className="plan">
      <h1 style={{ marginBottom: "10px" }}>Kits</h1>
      <p>Para você que já deseja um pacote completo e sem complicações</p>
      <div className="plancard" style={{ marginBottom: "40px" }}>
      <PlanCard
          image={home}
          heading="Kit Hobby"
          text="Eleve o seu hobby ao próximo nível com o nosso Kit de Aluguel para Ferramentas de Hobby."
          secondText="Ideal para entusiastas de todas as idades e níveis de habilidade, este kit oferece uma variedade de ferramentas de alta qualidade."
          price="R$49,90/dia"
        />
        <PlanCard
          image={garden}
          heading="Kit Jardinagem"
          text="Transforme o seu espaço verde com o nosso Kit de Aluguel para Jardinagem."
          secondText=" Criado para jardineiros iniciantes e experientes, este kit contém todas as ferramentas e acessórios essenciais para você cuidar do seu jardim como um profissional."
          price="R$39,90/dia"
        />
         <PlanCard
          image={construction}
          heading="Kit Obra"
          text="O seu projeto de construção ou renovação não precisa ser um desafio."
          secondText="Com o nosso Kit de Aluguel para Obras, você terá acesso a uma seleção de equipamentos de alta performance que facilitará qualquer tarefa, do básico ao avançado."
          price="R$119,90/dia"
        />
      </div>
      <a href="/products" className="looking-link">
        Ver todos os produtos
      </a>
    </div>
  );
};

export default Plan;
