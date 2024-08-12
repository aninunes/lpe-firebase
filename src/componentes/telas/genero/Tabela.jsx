import React, { useContext } from "react";
import GeneroContext from "./GeneroContext";
import Alerta from "../../comuns/Alerta";
import '../form-tables.css';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(GeneroContext);

    return (
        <div className="table-container">
            <h1>Gêneros</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn button" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map((objeto, index) => (
                                <tr key={objeto.id || index}> {/* Usando index como fallback se id não for único */}
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => editarObjeto(objeto.id)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover" onClick={() => remover(objeto.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{objeto.id}</th>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default Tabela;
