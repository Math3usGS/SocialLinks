import React, {useEffect} from "react";
import Prismic from "prismic-javascript";
import { useRouter } from "next/router";
import Head from "next/head";

//redirecionando o link
const RedirectTo = () => {
    const router = useRouter();
    useEffect(() => {
        console.log('Carregou');
        setTimeout(() => {
            router.push("/");
        }, 2000);
    }, []);
    return (
        <div className="w-1/2 mx-auto text-center mt-8">
            <Head>
                <title>
                    Página não encontrada.
                </title>
            </Head>
            <h1 className="font-bold text-4xl">URL não econtrada.</h1>
            <p>Estamos redirecionando você para a central de links.</p>
        </div>
    );
};
//encurtador de links
export async function getServerSideProps({params, res}) {
    const client = Prismic.client('https://matheusgs.cdn.prismic.io/api/v2');
    const link = await client.getByUID("shortlink",params.slug);
    if(link) {
        res.statusCode = 301; //conteudo movido permanentemente
        res.setHeader("Location",link.data.destino.url); //redireciona o usuario
        res.end();
        return;
    }
    return {
        props: {},
    }
}

export default RedirectTo;