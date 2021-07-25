import { Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {v4 as uuidv4} from 'uuid'
import { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const AddVeiculo = () => 
{
    let history = useHistory();
    const [marca, setMarca] = useState();
    const [modelo, setModelo] = useState();
    const [ano, setAno] = useState();

    const pegarCampoMarca = (evento) => setMarca(evento.target.value);
    const pegarCampoModelo = (evento) => setModelo(evento.target.value);
    const pegarCampoAno = (evento) => setAno(evento.target.value);

    const handleAddCarro = () =>
    {
        const dataAtual = new Date().getFullYear();
        const diferencaAnos = 20;

        if(dataAtual - ano > diferencaAnos)
        {
            alert("O ano definido não é válido! O sistema só aceita automóveis com menos de 20 anos de idade.")
        }
        else if(!!!marca ||!!!modelo ||!!!ano)
        {
            alert("Preencha todos os campos para salvar!")
        }
        else if(ano > dataAtual)
        {
            alert("O ano definido não é válido! O sistema não aceita automóveis com ano acima da data atual.")
        }
        else 
        {
            fetch("https://localhost:5001/api/carros", 
            {
                method: "POST",
                headers :
                { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(
                    {
                        id: uuidv4(),
                        marca: marca,
                        modelo: modelo,
                        ano: ano
                    }
                )
            })
            .then(async resposta => 
            {
                const respostaDados = await resposta.json();

                if (respostaDados === "sucesso") 
                {
                    alert("Dados Salvos com Sucesso!");
                    history.push("/");
                }
                else alert("Erro ao salvar!");
            })
            .catch(erro => alert(erro));
        }
    }

    const redirecionar = () => history.push("/");

    return (
        <>
            <h3 className="m3-3 d-flex justify-content-center"> Adicionar Automóvel</h3> 
            <div className="container" style={{backgroundColor: "lightslategrey", padding: "20px", width: "50%"}}>
                <form>
                    <InputGroup className="mb-3" size>
                        <InputGroup.Text id="basic-addon1">Marca</InputGroup.Text>
                        <FormControl placeholder="Marca" aria-label="Marca" aria-describedby="basic-addon1" onChange={pegarCampoMarca}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Modelo</InputGroup.Text>
                        <FormControl placeholder="Modelo" aria-label="Modelo" aria-describedby="basic-addon1" onChange={pegarCampoModelo}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Ano</InputGroup.Text>
                        <FormControl placeholder="Ano" aria-label="Ano" type="number" aria-describedby="basic-addon1" onChange={pegarCampoAno}/>
                    </InputGroup>
                </form>

                <Button variant="contained" color="primary" type="submit" onClick={handleAddCarro}> Salvar </Button>
                <Button variant="contained" color="secondary" style={{ float: "right"}} onClick={redirecionar}> Voltar </Button>
            </div>
        </>
         );
}
 
export default AddVeiculo;