import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import logo_unas from "../assets/images/logos/logo_unas.png";
import logo_product from "../assets/images/logos/logo_product.png";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "../api/auth";
import Loader from "../layouts/loader/Loader";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { setId, setRole, setUser, storeID, storeRole, storeUsername } =
    useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const createLoginMutation = useMutation({
    mutationFn: Auth,
    onSuccess: (response) => {
      setIsLoading(false);
      setIsSuccess(true);
      setIsError(false);
      setSuccessMessage("Login berhasil...");
      storeID(response.data.userId);
      storeRole(response.data.role);
      storeUsername(response.data.username);
      navigate("/dashboard");
    },
    onError: (error) => {
      setIsLoading(false);
      setIsSuccess(false);
      setIsError(true);
      setErrorMessage("Username atau password salah!");
    },
  });

  const clearMessages = () => {
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);
    setSuccessMessage("");
  };

  const MESSAGE_DISPLAY_TIME = 2000; // dalam milidetik (5 detik)
  if (isError || isSuccess) {
    setTimeout(clearMessages, MESSAGE_DISPLAY_TIME);
  }

  const handleOnLogin = async () => {
    setIsLoading(true);
    createLoginMutation.mutate({
      username: username,
      password: password,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <CardGroup>
              <Card>
                <CardBody>
                  {isError && <Alert color="danger">{ErrorMessage}</Alert>}
                  <Form>
                    <img src={logo_product} alt="logo_unas" width={"100%"} />

                    <p className="mx-2 text-body-secondary">
                      Masuk dengan akun Admin
                    </p>
                    <InputGroup className="mb-3 mx-2">
                      <Input
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4 mx-2">
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                    <Row className="">
                      <Col xs={6}>
                        <Button
                          color="primary"
                          className="mx-2 px-3 py-2"
                          onClick={handleOnLogin}
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="py-5" style={{ width: "50%" }}>
                <CardBody className="text-center">
                  <img src={logo_unas} alt="logo_unas" width={"50%"} />
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
