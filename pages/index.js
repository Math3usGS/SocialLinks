import React from "react";
import Prismic from "prismic-javascript";
import Head from "next/head";

// criando componente
const Index = ({data}) => {
    return (
    <div
        style={{
        backgroundColor: data.corfundo,
        color: data.cortexto,
    }}>
        <Head>
            <title>
                {data.pagetitle}
            </title>
        </Head>
        <div className="w-1/2 mx-auto text-center"> 
<h1 className="font-bold text-4xl p-8">{data.title}</h1>
            <img src={data.logo.url} className="mx-auto rounded-full shadow-2xl w-1/4"/>
            { data.body.map(item => {
                if(item.slice_type === 'secao'){
                    return <h2 className="font-bold text-2xl pt-3">{item.primary.nome}</h2>
                }   
                if(item.slice_type === 'link'){
                    return (
                        <div>
                            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-1 inline-block" 
                            href={item.primary.destino.url}
                            >
                                {item.primary.texto_do_botao}
                            </a>
                        </div>
                    );
                }
                /*if(item.slice_type === "imagem"){
                    return <img src={item.primary.imagem.url}/>
                }*/ 
                return null;
            })}
            <div className="text-center py-4 ">
                Projeto criado durante o Workshop Dev10k do <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded m-1 inline-block" href="https://devpleno.com">DevPleno</a><br />
                Código-fonte disponível em: 
            </div>
        </div>
    </div>
    ); 
};

//a página toda vez é renderizada no servidor
export async function getServerSideProps() {
    console.log("server");
    const client = Prismic.client('https://matheusgs.cdn.prismic.io/api/v2');
    const centralLinks = await client.getSingle("centraldelinks");
    console.log(centralLinks);
    return { 
        props: {
            data: centralLinks.data,
        }, 
    };
} 
export default Index;