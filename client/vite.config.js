import {defineConfig} from 'vite'

export default defineConfig({
    root: 'src',
    base: "./",
    server: {
        port: 3000,
        // proxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1:8080',
        //         changeOrigin: true,
        //     }
        // }
    }
})