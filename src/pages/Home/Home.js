import React from 'react';
import { useEffect, useState } from 'react';
import { FormControl, InputGroup, Table } from 'react-bootstrap';
import { Button } from '@material-ui/core';

const Home = () => 
{
    const [carros, setCarros] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    function atualizar()
    {
        fetch("https://localhost:5001/api/carros", 
        {
            headers : 
            { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then(async response => 
        {
            const dados = await response.json();
            setCarros(dados);
        })
    }

    useEffect(() =>
    {
        atualizar();
    }, [])

    useEffect(() =>
    {
        const resultados = carros.filter(carro => carro.marca.includes(pesquisa) || carro.modelo.includes(pesquisa) || carro.ano.includes(pesquisa));
        setCarros(resultados);
    }, [pesquisa]);

    const salvarCarro = (carro) => localStorage.setItem("carro", JSON.stringify(carro));

    const apagarCarro = (carro) =>
    {
        if(window.confirm("tem certeza disso?"))
        {
            fetch("https://localhost:5001/api/carros/" + carro.id, 
            {
                method: "DELETE",
                headers :
                { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(async resposta => 
                {
                    const respostaDados = await resposta.json();
    
                    if (respostaDados === "sucesso") 
                    {
                        atualizar();
                    }
                    else alert("Erro ao apagar!");
                })
            .catch(erro => alert(erro));

        }
    }

    const limpar = () =>
    {
        setPesquisa("");
        atualizar();
    }

    const Tabela = (busca) =>
    {
        return(
            <div>
                {(carros.length === 0) ? "" : 
                    <>      
                        <h3 className="m3-3 d-flex justify-content-center"> Automóveis Cadastrados </h3>
                        <Table className="mt-4" striped bordered hover size="md" >
                            <thead>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Opções</th>
                            </thead>

                            <tbody>
                                {carros.map(carro =>
                                    <tr key={carro.id}>
                                        <td>{carro.marca}</td>
                                        <td>{carro.modelo}</td>
                                        <td>{carro.ano}</td>
                                        <td style={{width: "200px"}}>
                                            <Button variant="contained" color="primary" onClick={() => salvarCarro(carro)} href="/EditarVeiculo"> Editar </Button>
                                            <Button variant="contained" color="secondary" onClick={() => apagarCarro(carro)} style={{float: "right"}}> Apagar </Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </>
                }

                
            </div>
        )
    }

    return(
        <>
            <h2 className="m3-3 d-flex justify-content-center"> Registro de Automóveis </h2>
            <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                <InputGroup className="mb-3 w-50" size="md" >
                    <InputGroup.Text id="basic-addon1">Pesquisa</InputGroup.Text>
                    <FormControl  aria-label="Marca" aria-describedby="basic-addon1" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                    <Button variant="contained" size="small" color="secondary"  onClick={() => limpar()} style={{marginRight: "25px"}}> Limpar </Button>
            <Button variant="contained" color="primary" href="/AddVeiculo"  size="small" > Adicionar Automóvel </Button>

                </InputGroup>


            </div>


            <Tabela /> 
        </>
    )
}

export default React.memo(Home);