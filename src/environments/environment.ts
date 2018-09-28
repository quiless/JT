import { SplashPage } from "../pages/splash/splash";

export var environment = {  
    rootPage:SplashPage,                    //Pagina inicial da aplicação
    enableSimulator:false,                   //Habilita a tela de simulação de requisição na HomePage
    enableFirebaseAuthState:true,           //Habilita o state change Auth do firebae, que redireciona para a home apos o login
    simulateSignIn:true,                   //Simula um sign in para facilitar o debug
    simulateSignInWithUserKey:"-LMsEBF4049LEzg2pfv7",           //Chave do usuário para simulação do login
    apiKeys:{
        firebase:{
            apiKey: "AIzaSyCPkujlY1dTQjZGukzXjzqPNK5CY33PF4k",
            authDomain: "justtap-8e195.firebaseapp.com",
            databaseURL: "https://justtap-8e195.firebaseio.com",
            projectId: "justtap-8e195",
            storageBucket: "justtap-8e195.appspot.com",
            messagingSenderId: "723897753446"
        }
    }
}