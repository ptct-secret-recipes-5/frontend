import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

//Styled-components

const Title = styled.h2`
  color: gray;
  font-size: 25px;
  display: flex;
  justify-content: center;
  @media (max-width: 625px) {
    font-size: 18px;
  }
`;

const TextConatiner = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 4% auto%;
  @media (max-width: 415px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Menu = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  color: gray;
  font-size: 25px;
  text-decoration: none;
  align-items: center;
  line-height: 1.6;
  @media (max-width: 625px) {
    font-size: 18px;
    a {
      font-size: 15px;
    }
  }
`;

const Connect = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  font-size: 25px;
  text-decoration: none;

  @media (max-width: 625px) {
    width: 50%;
    margin-top: 4%;
    font-size: 18px;
    a {
      font-size: 15px;
    }
  }
`;

const TextH3 = styled.h3`
  font-size: 35px;
  @media (max-width: 625px) {
    font-size: 18px;
  }
  @media (max-width: 415px) {
    font-size: 15px;
  }
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  // border: 1px solid black;
`;

const Icon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 4%;
`;

function Footer() {
  return (
    <div>
      <Title>Secret Recipes</Title>
      <TextConatiner>
        <Menu>
          <TextH3>MENU</TextH3>

          <a href="/">Home</a>
          <a href="/login">Log In</a>
          <a href="/register">Sign up</a>
          <a href="/recipe-list">Recipes</a>
          <a href="/add">Add Recipe</a>
        </Menu>
        <Connect>
          <TextH3>Contact</TextH3>
          <Icons className="icons">
            <Icon className="email">
              <a href="mailto:secret-family-recipes@gmail.com">
                <MailOutlineIcon style={{ fontSize: 35 }} />
              </a>
            </Icon>
            <Icon className="twitter">
              <a href="https://www.twitter.com/">
                <TwitterIcon style={{ fontSize: 35 }} to="www.google.com" />
              </a>
            </Icon>
            <Icon className="insta">
              <a href="https://www.instagram.com/">
                <InstagramIcon style={{ fontSize: 35 }} />
              </a>
            </Icon>
            <Icon className="facebook">
              <a href="https://www.facebook.com/">
                <FacebookIcon style={{ fontSize: 35 }} />
              </a>
            </Icon>
          </Icons>
        </Connect>
      </TextConatiner>
    </div>
  );
}

export default Footer;
