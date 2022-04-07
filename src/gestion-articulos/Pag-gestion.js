import {useEffect, useState} from 'react';

function Pag_Gestion(){
    return (
        <div>
            <Head_Gestion />
            <Table_Arts />
        </div>
    );
    
}

function Head_Gestion(){
    return(
        <header>
            <div className="container-fluid">
                <div className="row">
                    <h1 className="text-center pt-3">Gestión de artículos</h1>
                </div>
                <div className="row pt-3">
                    <article>

                    </article>
                </div>
            </div>
        </header>   
    );
}

function Table_Arts(){
    
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(()=>{
        responseAPI();
    },[])

    const responseAPI = async()=>{
        const requestOptions = {
            method: 'POST',
        }
        const data = await fetch("http://localhost:3500/articulos",requestOptions);
        const dataJson = await data.json();
        setError(dataJson.error);
        setMessage(dataJson.message);
        setArticulos(dataJson.data);
    }   

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-5'>
                    <table className='table table-striped table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>Autor</th>
                                <th scope='col'>Articulo</th>
                                <th scope='col'>Versión</th>
                                <th scope='col'>Estatus</th>
                            </tr>
                        </thead>
                    {error ? message : ((articulos != null ? <Rows_Arts rows = {articulos} /> : message))}
                </table>
                </div>

            </div>
        </div>
    );

}

function Rows_Arts(props){
    const arts = props.rows.map((row,i)=>{
        return(
            <tr key={i}>
                <td scope='row'>
                    {row.autor}
                </td>
                <td>
                    <a href={row.archivo}>{row.titulo_articulo}</a>
                </td>
                <td>
                    {row.num_version}
                </td>
                <th>
                    {row.estatus}
                </th>
            </tr>
        );
    });
    return(
        <tbody>
            {arts}
        </tbody>
    );
}

export default Pag_Gestion;