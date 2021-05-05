import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    FormInput,
    Form,
    Button
} from "shards-react";

import { PageTitle, CardItem } from "../components/common";

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
                    id: "preco",
                    value: "",
                },
                data: {
                    id: "data",         /* Criando os atributos dos inputs */
                    value: "",
                },
                url: {
                    id: "url",
                    value: ""
                },
                filter: {
                    id: "filter",
                    value: ""
                }
            },
            typePage: "list"    /* Criando atributo responsável pelo conteúdo da página */
        }
    };

    onChange(e) {
        e.preventDefault();
        let { form } = this.state;        /* Funçao responsavel por atributir valor aos inputs */
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
                break;
            case form.filter.id:
                form.filter.value = inputValue;
                break;
            default:
                break;
        }
        this.setState({ form })
    }

    onRegister(e) {
        e.preventDefault();
        let { form } = this.state;
        let body = {
            nome: form.nome.value,
            preco: form.preco.value,
            data: form.data.value,                      /* Criando o objeto com as informaçôes dos inputs */
            url: form.url.value
        }
        let storage = localStorage.getItem("product")   /* Buscando dados do local storage */
        if (storage) {      /* Caso já exista um item no local storage */
            const aux = JSON.parse(storage)
            aux.push(body)                        /* Coletando os itens do local storage e adicionando o novo objeto */
            localStorage.setItem("product", JSON.stringify(aux))
            this.clearAll()

        } else { /* Caso nâo exista um item no local storage */
            let database = []
            database[0] = body                                          /* Criando o primeiro item no local storage */
            localStorage.setItem("product", JSON.stringify(database))
        }

        this.setState({ typePage: "list" })
        localStorage.setItem("produto", body);
    }

    clearAll() {
        let { form } = this.state;
        form.nome.value = "";
        form.url.value = "";
        form.data.value = "";
        form.preco.value = "";                      /* Funçâo para limpar os inputs */
        form.filter.value = ""
        this.setState({ form });
    }

    changePage(type) {
        let { typePage } = this.state
        typePage = type                         /* Funçao para mudar a página a ser visualizada */
        this.setState({ typePage });
    }

    removeItem(idx) {
        let storage = localStorage.getItem("product")
        const aux = JSON.parse(storage)
        aux.splice(idx, 1)                                                      /* Removendo um item do array */
        localStorage.setItem("product", JSON.stringify(aux));
        this.setState({ typePage: "list" })   /* Voltando para a página de listagem */
    }

    render() {
        let { typePage, form } = this.state

        let productList = localStorage.getItem('product');                  /* Buscando o array no local storage */
        let aux = JSON.parse(productList);

        let list = aux && aux.filter((l) => {               /* Filtragem da lista */
            const filter = form.filter.value.toLowerCase();
            const nome = l.nome.toLowerCase();
            return nome.includes(filter);

        });

        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="SHOP PUC" className="text-sm-left" /> {/* Componente de titulo */}
                </Row>
                {typePage == "list" ?    /* Mostrar a tela de listagem */
                    <Row>
                        <Col md="10" className="form-group">
                            <FormGroup>
                                <label >Filtrar</label>
                                <FormInput
                                    required
                                    type="text"             /* Input de filtro */
                                    className="form-control"
                                    id={this.state.form.filter.id}
                                    value={this.state.form.filter.value}
                                    onChange={this.onChange.bind(this)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="2" style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                            <Button onClick={() => this.changePage("edit")} theme="primary">
                                <span>Criar <i className="fas fa-plus"></i></span>      {/* Botao de novo item */}
                            </Button>
                        </Col>
                        {list && list.map((item, idx) => {       /* Renderiza o card de itens */
                            return (
                                <CardItem
                                    idx={idx}            /* Component de card */
                                    product={item}
                                    removeItem={this.removeItem.bind(this)}
                                />
                            )
                        })}
                    </Row>
                    :                                                   /* Mostrar a tela de criaçao */
                    <Row className="d-flex justify-content-center">
                        <Col lg="12">
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
                                                        id={this.state.form.nome.id}                /* Input de nome */
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
                                                        type="number"
                                                        className="form-control"
                                                        id={this.state.form.preco.id}            /* Input de preço */
                                                        value={this.state.form.preco.value}
                                                        onChange={this.onChange.bind(this)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6" className="form-group">
                                                <FormGroup>
                                                    <label htmlFor={this.state.form.data.id}>Data da compra<span style={{ color: "red" }}>*</span></label>
                                                    <FormInput
                                                        type="date"
                                                        required
                                                        className="form-control"                /* Input de data */
                                                        id={this.state.form.data.id}
                                                        value={this.state.form.data.value}
                                                        onChange={this.onChange.bind(this)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" className="form-group">
                                                <FormGroup>
                                                    <label htmlFor={this.state.form.data.id}>URL - Imagem<span style={{ color: "red" }}>*</span></label>
                                                    <FormInput
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        id={this.state.form.url.id}                     /* Input de url */
                                                        value={this.state.form.url.value}
                                                        onChange={this.onChange.bind(this)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-center">                     {/* Botôes de salvar ou voltar página */}
                                            <Col md="4">
                                                <Button block theme="primary" onClick={() => this.changePage("list")}>
                                                    <span>Voltar <i class="fas fa-arrow-alt-circle-left"></i></span>
                                                </Button>
                                            </Col>
                                            <Col md="4">
                                                <Button block type="submit" theme="primary">
                                                    <span>Salvar <i class="fas fa-save"></i></span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                }
            </Container>
        );
    }
}