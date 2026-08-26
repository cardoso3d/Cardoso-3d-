import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve os arquivos estáticos gerados pelo build do Vite
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback para SPA - direciona todas as rotas não encontradas para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// A Hostinger geralmente fornece a porta pela variável de ambiente PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
