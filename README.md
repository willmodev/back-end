# Curso OpenIA API

Descubre cómo la API de OpenAI puede revolucionar tu negocio. Desde chatbots inteligentes que entienden y actúan, hasta herramientas que procesan datos, generan código y automatizan tarea. Aprende a integrar GPT-4o, lleva tus ideas al siguiente nivel con inteligencia artificial.


## Configuración y Uso 🚀

### Requisitos Previos
- Node.js instalado en tu sistema
- Git para clonar el repositorio

### Pasos de Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd curso-openia-api
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Seleccionar el Proyecto**
   ```bash
   cd [nombre-del-proyecto]
   ```

   Por ejemplo:
   ```bash 
   cd ChatCompletationAPI
   ```

4. **Iniciar la Aplicación**
   ```bash
   npm start
   ```

> **Nota**: Debes crear tu archivo `.env` copiando el archivo `.env.example` y colocar tu API key de OpenAI en la variable `OPENAI_API_KEY`. Por ejemplo:
> ```bash
> cp .env.example .env
> ```
> Luego edita el archivo `.env` y coloca tu API key:
> ```
> OPENAI_API_KEY="tu-api-key-aqui"
> ```