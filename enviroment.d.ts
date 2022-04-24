declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            SERVIDOR: string;
            PREFIX: string;
            EMBEDCOLOR: string;
            ENV: 'PROD' | 'DEV';
        }
    }
}

export {};