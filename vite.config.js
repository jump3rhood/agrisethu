import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                story: resolve(__dirname, 'pages/story.html'),
                exports: resolve(__dirname, 'pages/exports.html'),
                contact: resolve(__dirname, 'pages/contact.html'),
                farmer_employment: resolve(__dirname, 'pages/farmer-employment.html'),
                animal_husbandry: resolve(__dirname, 'pages/animal-husbandry.html'),
            },
        },
    },
});
