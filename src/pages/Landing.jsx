import main from "../assets/images/main.svg";
import styled from "styled-components";
import Logo from "../component/Logo";
import { Link } from "react-router-dom";
// import Wrapper from '../assets/wrappers/LandingPage'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            placeat error accusantium autem quas quasi consectetur, doloribus,
            porro nobis recusandae fugit aut impedit magnam officia qui natus
            sit. Aperiam, eos!
          </p>
          <Link to='register' className="btn btn-hero">login/register</Link>
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    height: 100vh;
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;

    span {
      color: var(--primary-500);
    }
    p {
      color: var(--grey-600);
    }
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Landing;
