# Trueque

Trueque es una marketplace donde las personas pueden donar y recibir objetos de forma gratuita.

## Entrega Parcial 2: Integración backend + frontend y autenticación

El objetivo de esta segunda versión es conectar el frontend ya codificado para la primera versión con el backend. Hemos decidido utilizar **Node.js** y **Express** para implementarlo. 

Aún no hemos tenido tiempo de desarrollar el módulo de administración, que añadiremos a la versión final.

## Integrantes
- Nelson Fuentes Ladron de Guevara
- Manon Alicia Bertrand

## Pasos para ejecutar el proyecto

1. Clonar el repositorio.
```bash
git clone https://github.com/Manon3005/trueque-app.git
```

2. Instalar dependencias.
```bash
cd frontend
npm install
```
```bash
cd backend
npm install
```

3. Crear la base de datos y generar el cliente Prisma.
```bash
cd backend
npm run db:setup
```

4. Ejecutar el backend de la aplicación.
```bash
cd backend
npm run build
npm run start
```

5. Ejecutar el frontend de la aplicación en modo desarrollo.
```bash
cd frontend
ionic serve
```

6. Abrir la aplicación en el navegador en [localhost](http://localhost:8100).
