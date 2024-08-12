import { useState, useEffect } from "react";
import FilmeContext from "./FilmeContext";
import {
    getFilmesAPI, getFilmePorIdAPI,
    deleteFilmePorIdAPI, cadastrarFilmeAPI
} from "../../../servicos/FilmeServico";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Filme() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ id: "", titulo: "", descricao: "", ano_lancamento: "", genero_id: "", genero_nome: "" });
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ id: 0, titulo: "", descricao: "", ano_lancamento: "", genero_id: "", genero_nome: "" });
    }

    const editarObjeto = async id => {
        try {
            const dados = await getFilmePorIdAPI(id);
            setObjeto(dados);
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastrarFilmeAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
            recuperaFilmes();
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaFilmes = async () => {
        try {
            setCarregando(true);
            const dados = await getFilmesAPI();
            console.log("Dados recebidos:", dados); // Adicionei detalhes ao log
            setListaObjetos(dados);
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }
    
    

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteFilmePorIdAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaFilmes();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaFilmes();
    }, []);


    return (
        <FilmeContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </FilmeContext.Provider>
    )
}

export default WithAuth(Filme);
