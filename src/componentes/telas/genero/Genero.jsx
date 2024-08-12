import { useState, useEffect } from "react";
import GeneroContext from "./GeneroContext";
import {
    getGenerosAPI, getGeneroPorIdAPI,
    deleteGeneroPorIdAPI, cadastrarGeneroAPI
} from "../../../servicos/GeneroServico";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Genero() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ id: "", nome: "", descricao: "" });
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ id: 0, nome: "", descricao: "" });
    }

    const editarObjeto = async id => {
        try {
            setObjeto(await getGeneroPorIdAPI(id));
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
            let retornoAPI = await cadastrarGeneroAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaGeneros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaGeneros = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getGenerosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async id => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteGeneroPorIdAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaGeneros();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaGeneros();
    }, []);


    return (
        <GeneroContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </GeneroContext.Provider>
    )
}

export default WithAuth(Genero);
