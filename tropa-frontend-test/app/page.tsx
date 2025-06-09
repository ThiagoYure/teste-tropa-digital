"use client"
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  display: flex;
  height: 65vh;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
  width: 47%;
  background-color: #FFFFFF;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    flex-direction: column;
    flex-flow:column-reverse;
    border-radius: 0;
    justify-content: center;
  }
`;

const LoginFormSection = styled.div`
  display: flex;
  width: 45%;
  height: 100%;
  padding: 3rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  row-gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  row-gap: 0.3rem;
`;

const ImageSection = styled.div`
  height: 100%;
  width: 55%;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.5rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
    height: 50%;
    padding: 0;
  }
`;

const Square = styled.div`
  display: flex;
  height: 100%;
  width: 95%;
  border-radius: 1rem;
  background-color: var(--main-orange);

  @media (max-width: 768px) {
    width: 100%;
    height: 90%;
    border-radius: 0 0 1rem 1rem;
  }
`;

const Title = styled.h1`
  color: var(--main-orange);
  box-sizing: content-box;
  font-family: Roboto;
  font-weight: 700;
  font-size: 26px;
  line-height: 90%;
  letter-spacing: 0%;
`;

const Pg = styled.p`
  color: var(--blue);
  font-family: Roboto;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0%;
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  border-radius: 100px;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  background-color: var(--lighter-grey);
  border: none;
  color: var(--teal);
  outline: none;
  border: 0.1rem solid transparent;

  &.error {
    border: 1px solid red;
  }

  &:focus{
    border: 0.1rem solid var(--main-orange);
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 2.5rem;
  border-radius: 100px;
  justify-content: space-between;
  padding-top: 10px;
  padding-right: 25px;
  padding-bottom: 10px;
  padding-left: 25px;
  background-color: ${({ disabled }) => (disabled ? 'var(--teal)' : 'var(--main-orange)')};
  color: #FFFFFF;
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover {
    background-color: #cc6137b9;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 13px;
  color: var(--teal);

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const Label = styled.label`
  color: var(--main-orange);
  font-family: Roboto;
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0%;
`;

const ImageComponent = styled.img`
  width: 20rem;
  position: absolute;
  bottom: 0.5rem;
  left: -0.1rem;
  height: auto;

  @media (max-width: 768px) {
    right: 20%;
    left: unset;
    bottom: 0;
    width: 15rem;
  }
`;

const LogoComponent = styled.img`
  width: 60%;
  height: auto;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--main-orange);
`;

interface EyeIconProps {
  open: boolean;
}

const EyeIcon: React.FC<EyeIconProps> = ({ open }) => (
  open ? (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.45 21.45 0 015.29-5.77" />
      <path d="M1 1l22 22" />
      <path d="M9.88 9.88a3 3 0 104.24 4.24" />
      <path d="M14.12 14.12L9.88 9.88" />
      <path d="M10.73 5.08A10.94 10.94 0 0112 4c7 0 11 8 11 8a21.45 21.45 0 01-4.83 5.17" />
    </svg>
  )
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false
  });
  const router = useRouter();

  const handleLogin = () => {
    const newErrors = {
      username: username.trim() === '',
      password: password.trim() === ''
    };
    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      setError(true);
      setMessage('Preencha todos os campos.');
      return;
    }

    setError(false);

    setLoading(true);
    setMessage('Fazendo login...');

    setTimeout(() => {
      setLoading(false);
      setMessage('Login bem-sucedido! Redirecionando...');
      setSuccess(true);

      setTimeout(() => {
        setMessage('Bem vindo!');
        router.push('/eventos');
      }, 1500);
    }, 1500);
  }

  return (
    <Container initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <LoginFormSection>
        <LogoComponent
          src={'/logo-tropa.svg'}
          alt="Logotipo da Tropa Digital"
        />
        <div>
          <Title>Bem-vindo de volta</Title>
          <Pg>Entre com sua conta para acessar o painel.</Pg>
        </div>
        <FormSection>
          <InputGroup>
            <Label htmlFor="email">E-mail *</Label>
            <Input id="email" name="email" type="email" required placeholder="seunome@seuservidor.com"
              value={username}
              className={error ? 'error' : ''}
              onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Senha *</Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                className={error ? 'error' : ''}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ToggleButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
                <EyeIcon open={showPassword} />
              </ToggleButton>
            </InputWrapper>
          </InputGroup>
          <Button disabled={loading || success} onClick={handleLogin}>
            {loading ? <SpinnerContainer><Spinner /></SpinnerContainer> : 'Enviar'}
          </Button>
          {message && <Message>{message}</Message>}
        </FormSection>
      </LoginFormSection>
      <ImageSection>
        <Square />
        <ImageComponent
          src={'/login-illustration.svg'}
          alt="Ilustração de um homem com notebook"
        />
      </ImageSection>
    </Container>
  )
}
