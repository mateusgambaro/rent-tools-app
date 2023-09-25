import HomeHero from "../modules/HomeHero/HomeHero";
import Navbar from "../modules/NavBar/NavBar";
import toolsrent from '../assets/toolsrent.webp'
import Plan from "../modules/Plans/Plan";

export const Home = () => {
    return (
        <>
        <Navbar />
        <HomeHero
        cName="hero"
        coverImg={toolsrent}
        title="Seu vizinho não te emprestou?"
        subtitle="Na AlluTools você encontra."
        btnClass="show"
        buttonText="Ver ferramentas"
      />
      <Plan/>
        </>
    )
}

export default Home;