import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormSelect,
    FormGroup,
    FormInput,
    Form,
    Button
} from "shards-react";

import { RestApi, Mask, Cookies } from "../module"
import { PageTitle, GenericRegister } from "../components/common";
import { Link } from "react-router-dom";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                nome: {
                    id: "nome",
                    value: "",
                },
                preco: {
                    id: "P,0,",
                    value: "",
                },
                data: {
                    id: "data",
                    value: "",
                },
                url: {
                    id: "url",
                    value: ""
                }
            },
            awaitingSubmit: false
        }
    };

    onChange(e) {
        e.preventDefault();
        let { form } = this.state;
        let inputValue = e.target.value;
        switch (e.target.id) {
            case form.nome.id:
                form.nome.value = inputValue;
                break;
            case form.preco.id:
                form.preco.value = inputValue;
                break;
            case form.data.id:
                form.data.value = inputValue;
                break;
            case form.url.id:
                form.url.value = inputValue;
            default:
                break;
        }
        this.setState({ form })
    }
    onRegister(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true })
        let { form } = this.state;
        let body = {
            nome: form.nome.value,
            preco: form.preco.value,
            data: form.data.value,
            url: form.url.value
        }
        console.log(body);
        localStorage.setItem("produto", body);
        window.location.href = "get-system";
    }

    ClearAll() {
        let form = this.state.form;
        form.nome.value = "";
        form.url.value = "";
        form.data.value = "";
        form.preco.value = "";
        this.setState({ form: form });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="SHOP PUC" className="text-sm-left" />
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="8">
                        <Card>
                            <Form onSubmit={this.onRegister.bind(this)}>
                                <CardBody>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.nome.id}>Nome<span style={{ color: "red" }}>*</span></label>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.nome.id}
                                                    value={this.state.form.nome.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.preco.id}>Preço<span style={{ color: "red" }}>*</span></label>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.preco.id}
                                                    value={this.state.form.preco.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.data.id}>Data da compra</label>
                                                <FormInput
                                                    type="date"
                                                    className="form-control"
                                                    id={this.state.form.data.id}
                                                    value={this.state.form.data.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <label htmlFor={this.state.form.data.id}>URL - Imagem</label>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.url.id}
                                                    value={this.state.form.url.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="4">
                                            <Button block theme="primary" tag={Link} to={`/get-system/`}>
                                                <span>Voltar <i class="fas fa-arrow-alt-circle-left"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="4">
                                            <Button block type="submit" theme="primary">
                                                {this.state.awaitingSubmit ?
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    : <span>Salvar <i class="fas fa-save"></i></span>
                                                }
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}