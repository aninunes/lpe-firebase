import React, { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import GeneroContext from "./GeneroContext";
import '../form-tables.css';

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(GeneroContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edição de Gêneros</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar} className="form-container needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="input-group">
                                <label htmlFor="txtId" className="label">Código</label>
                                <input type="number" className="form-control" id="txtId" readOnly name="id" value={objeto.id} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="txtNome" className="label">Nome</label>
                                <input type="text" className="form-control" id="txtNome" placeholder="Informe o nome" required name="nome" value={objeto.nome} onChange={handleChange} />
                                <div className="valid-feedback">Nome OK!</div>
                                <div className="invalid-feedback">Informe o nome!</div>
                            </div>
                            <div className="input-group">
                                <label htmlFor="txtDescricao" className="label">Descrição</label>
                                <input type="text" className="form-control" id="txtDescricao" placeholder="Informe a descrição" required name="descricao" value={objeto.descricao} onChange={handleChange} />
                                <div className="valid-feedback">Descrição OK!</div>
                                <div className="invalid-feedback">Informe a descrição!</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn submit">Salvar <i className="bi bi-save"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
