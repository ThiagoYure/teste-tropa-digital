"use client"
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiLogOut, FiEdit2, FiSearch, FiPlus, FiMoreVertical } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { RiGroupLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { IoPowerOutline } from "react-icons/io5";
import { IoIosArrowBack, IoMdSearch } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { IoMenuOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--light-grey);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 210px;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid #0000001A;
  position: static;
  transform: translateX(0);
  transition: none;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 1rem;
    padding-top: 1.8rem;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 999;
  }

  &.open {
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }
`;

const MenuText = styled.span`
    width: 100%;
    text-align: start;
    font-family: Roboto;
    font-weight: 800;
    font-size: 9px;
    line-height: 15px;
    letter-spacing: 12%;
    color: var(--grey);
    padding: 0 2.225rem;
    box-sizing: border-box;
`;

const LogoComponent = styled.img`
  width: 100%;
  height: auto;
  padding: 1.6rem 2.225rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    gap: 0.625rem;
    border-bottom: 1px solid #0000001A;
    padding: 0 1.6rem;

    button {
        font-family: Roboto;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0%;
        width: 100%;
        background: none;
        border: none;
        text-align: left;
        font-size: 0.875rem;
        color: var(--black);
        padding: 0.625rem;
        border-radius: 0.313rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.625rem;
        cursor: pointer;

        &.active,
        &:hover {
            background-color: var(--main-orange);
            color: #ffffff;
        }
    }

    @media (max-width: 768px) {
      height: auto;
    }
`;

const BottomMenu = styled.div`
    display: flex;
    height: max-content;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding: 1.6rem;
    gap: 5px;

    button {
        padding: 10px;
        display: flex;
        flex-direction: row;
        gap: 10px;
        color: var(--black);
        font-family: Roboto;
        font-weight: 500;
        font-size: 14px;
        line-height: 15px;
        letter-spacing: 0%;
        background: none;
        border: none;
        cursor: pointer;
        width: 100%;
        border-radius: 0.313rem;

        &.active,
        &:hover {
            background-color: var(--main-orange);
            color: #ffffff;
        }
    }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;

  div{
    display: flex;
    flex-direction: column;
    gap:1px;
  }

  span{
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: 0%;
    color: #000000;
  }

  p{
    font-family: Roboto;
    font-weight: 400;
    font-size: 11px;
    line-height: 15px;
    letter-spacing: 0%;
    color: #00000080;
  }
`;

const PhotoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    border: 1px solid var(--main-orange);
    border-radius: 0.85rem;
    overflow: hidden;
    box-sizing: border-box;
  
  img{
    width: 100%;
    border-radius: 0.85rem;
    border: 2px solid #FFFFFF;
  }
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
`;

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0 30px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    gap: 40px;
    padding: 40px 20px;
    border-radius: 10px;
    border: 1px solid #09428F2B;
    background-color: #FFFFFF;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  width: 100%;
  height: 119px;
  justify-content: space-between;
  padding: 30px;

  h2{
    font-family: Roboto;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0%;
    color: #00000099;
    strong{
        color: #101010;
        font-family: Roboto;
        font-weight: 700;
        font-size: 16px;
        line-height: 23px;
        letter-spacing: 0%;
    }

  }

  h3{
    font-family: Roboto;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0%;
    color: var(--main-orange);
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  .search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
      width: 100%;
    }

    .iconSearch {
      position: absolute;
      left: 10px;
      top: 12px;
      color: #00000033;
    }

    input {
        border-radius: 33px;
        background-color: var(--lighter-grey);
        padding: 10px 15px 10px 30px;
        color: #00000033;
        color: var(--black);
        width: 100%;
        border: 2px solid transparent;
        outline: none;
        font-weight: 500;
        font-size: 13px;
        line-height: 15px;
        letter-spacing: 0%;

        &::placeholder{
            font-weight: 500;
            font-size: 13px;
            line-height: 15px;
            letter-spacing: 0%;
            color: #00000033;
        }
        
        &:focus{
            border: 2px solid var(--main-orange);
        }
    }
  }

  button {
      background-color: var(--main-orange);
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 100px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0%;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: #cc6137b9;
      }

      @media (max-width: 768px) {
        padding: 15px 15px;
        span {
          display: none;
        }
      }
    }

    @media (max-width: 768px) {
      justify-content: space-between;
      width: 100%;
    }
`;

const Table = styled.table`
  width: 100%;
  background-color: transparent;
  border-radius: 10px;
  border-collapse: collapse;
  font-size: 0.875rem;
  table-layout: fixed;

  th, td {
    width: 100%;
    padding: 13px 0;
    text-align: left;
  }

  th {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0%;
    color: #CC623780;
    border-bottom: 1px solid #0000001A;
  }

  td {
    border-bottom: 1px solid #0000001A;
    font-family: Roboto;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0%;
    color: var(--teal);
  }

  .lastColumn {
    font-size: 20px;
    color: var(--main-orange);
    width: auto;
    text-align: right;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    table {
      overflow: hidden;
    }

    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 1rem;
      border-bottom: 1px solid #0000001A;
      border-radius: 8px;
      padding: 0;
      font-size: 0.5rem;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem 0.3rem;
      border-bottom: none;
      text-align: right;
      flex: 1;
    }

    td::before {
      content: attr(data-label);
      font-weight: 600;
      color: #CC623780;
      text-align: left;
      flex: 2;
    }
  }
`;

const Page = styled.button`
  padding: 10px;
  width: 35px;
  border: none;
  background-color: var(--lighter-grey);
  border-radius: 200px;
  color: var(--black);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: #e36526;
    color: white;
    border: none;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  svg{
    display: none;
  }

  button {
    padding: 10px 16px;
    border: none;
    background-color: var(--lighter-grey);
    border-radius: 200px;
    color: var(--black);
    cursor: pointer;
  }

  .afterButton{
    background-color: var(--main-orange);
    color: white;
    border: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;

    .afterButton{
      padding: 10px;
    }

    .beforeButton{
      padding: 10px;
    }

    svg{
      display: block;
    }
    span{
      display: none;
    }
  }
`;

const MobileNav = styled.nav`
  width: 100%;
  padding: 0.5rem 1.8rem;
  display: none;
  background-color: #FFFFFF;
  border-bottom: 1px solid #0000001A;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 150px;
    height: auto;
    box-sizing: border-box;
  }

  button {
    margin-top: 1rem;
    text-align: center;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--main-orange);
  }
`;

export default function Eventos() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <Container>
      <MobileNav>
        <img src={'/logo-tropa.svg'}
          alt="Logotipo da Tropa Digital" />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}><IoMenuOutline /></button>
      </MobileNav>
      <Sidebar ref={navRef} className={isSidebarOpen ? 'open' : ''}>
        <LogoComponent
          src={'/logo-tropa.svg'}
          alt="Logotipo da Tropa Digital"
        />
        <MenuText>MENU</MenuText>
        <Nav>
          <button><IoGridOutline /><p>Dashboard</p></button>
          <button className="active"><MdOutlineCalendarMonth /><p>Eventos</p></button>
          <button><GrGroup /><p>Equipes</p></button>
          <button><RiGroupLine /><p>Inscrições</p></button>
        </Nav>
        <BottomMenu>
          <Profile>
            <PhotoContainer>
              <img
                src={'/profile-picture.png'}
                alt="Foto de Perfil do usuário"
              />
            </PhotoContainer>
            <div><span>Kaique Steck</span><p>Administrador</p></div>
          </Profile>
          <button><FaRegUser /><p>Alterar dados</p></button>
          <button onClick={() => { router.push("/") }}><IoPowerOutline /><p>Sair</p></button>
        </BottomMenu>
      </Sidebar>
      <Main>
        <Title>
          <h2>Bem vindo de volta, <strong>Kaique Steck</strong></h2>
          <h3>Todos eventos</h3>
        </Title>
        <MainContainer>
          <MainContent>
            <Header>
              <div className="search">
                <div className="iconSearch"><IoMdSearch /></div>
                <input type="text" placeholder="Buscar eventos" />
              </div>
              <button><FiPlus /><span>Inserir novo</span></button>
            </Header>
            <Table>
              <thead>
                <tr>
                  <th>Nome do evento</th>
                  <th>Total de equipes</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Nome do evento">Clube de Laço Coração Pantaneiro</td>
                  <td data-label="Total de equipes">10</td>
                  <td data-label="Status" className="status"><span style={{ backgroundColor: '#4DEF00', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block' }}></span> Ativo</td>
                  <td data-label="Data">09 a 11 de Junho</td>
                  <td className="lastColumn"><FiMoreVertical /></td>
                </tr>
                <tr>
                  <td data-label="Nome do evento">Clube de Laço Coração Pantaneiro</td>
                  <td data-label="Total de equipes">10</td>
                  <td data-label="Status" className="status"><span style={{ backgroundColor: '#4DEF00', borderRadius: '50%', width: '9px', height: '9px', display: 'inline-block' }}></span> Ativo</td>
                  <td data-label="Data">09 a 11 de Junho</td>
                  <td className="lastColumn"><FiMoreVertical /></td>
                </tr>
              </tbody>
            </Table>
            <Pagination>
              <button className="beforeButton"><IoIosArrowBack /><span>Anterior</span></button>
              <Page className="active">1</Page>
              <Page>2</Page>
              <Page>3</Page>
              <button className="afterButton"><IoIosArrowForward /><span>Próximo</span></button>
            </Pagination>
          </MainContent>
        </MainContainer>
      </Main>
    </Container>
  );
}
