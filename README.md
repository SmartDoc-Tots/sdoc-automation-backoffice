Automatización de Pruebas para Backoffice (sdoc-automation-backoffice)
Este repositorio contiene un conjunto de pruebas automatizadas de extremo a extremo (E2E) para la aplicación de backoffice de SmartDoc. El proyecto está desarrollado con Playwright y TypeScript para garantizar la calidad y el correcto funcionamiento de las funcionalidades clave de la plataforma.

🚀 Propósito del Proyecto
El objetivo principal de este proyecto es automatizar las pruebas de regresión y verificar nuevas funcionalidades de forma rápida y fiable. Esto nos permite detectar errores de manera temprana, agilizar el ciclo de desarrollo y asegurar una experiencia de usuario estable.

✨ Características Principales
Framework Moderno: Utiliza Playwright para pruebas rápidas, fiables y compatibles con los principales navegadores.

Patrón de Diseño Page Object Model (POM): El código está organizado en pages para separar la lógica de las pruebas de la definición de los elementos de la interfaz, lo que facilita el mantenimiento.

Autenticación Optimizada: Incluye un flujo de autenticación global (auth.setup.ts) que inicia sesión una sola vez y reutiliza el estado de la sesión para todas las pruebas, reduciendo significativamente el tiempo de ejecución.

Integración Continua (CI): Configurado con GitHub Actions para ejecutar las pruebas automáticamente en cada push o pull request a la rama main, y también de forma programada.

Soporte Multi-navegador: Las pruebas están configuradas para ejecutarse en Chromium, Firefox, WebKit, Microsoft Edge y Google Chrome.

Reportes Claros: Genera reportes HTML detallados para analizar los resultados de las pruebas de manera sencilla.

🛠️ Tecnologías Utilizadas
Playwright

TypeScript

Node.js

GitHub Actions

📦 Prerrequisitos
Asegúrate de tener instalado Node.js en tu sistema (se recomienda la versión 18 o superior).

⚙️ Instalación y Configuración
Clona el repositorio:

Bash

git clone <URL-DEL-REPOSITORIO>
cd sdoc-automation-backoffice
Instala las dependencias:
Se recomienda usar npm ci para una instalación limpia basada en el archivo package-lock.json.

Bash

npm ci
Instala los navegadores de Playwright:
Este comando descarga los navegadores necesarios para las pruebas.

Bash

npx playwright install --with-deps
Configura las credenciales:
Las credenciales de prueba se encuentran en el archivo utils/config.ts. Si es necesario, ajusta la URL y los datos de acceso para tu entorno de pruebas.

▶️ Ejecución de las Pruebas
Puedes ejecutar las pruebas utilizando los siguientes comandos:

Ejecutar todas las pruebas en todos los navegadores configurados:

Bash

npx playwright test
Ejecutar las pruebas en un navegador específico:

Bash

# Ejecutar solo en Firefox
npx playwright test --project="firefox"

# Ejecutar solo en Google Chrome
npx playwright test --project="Google Chrome"
Ejecutar las pruebas en modo "headed" (con interfaz gráfica):

Bash

npx playwright test --headed
Ver el reporte de resultados:
Una vez finalizada la ejecución, puedes visualizar el reporte HTML con el siguiente comando:

Bash

npx playwright show-report
📂 Estructura del Proyecto
/
├── .github/workflows/      # Contiene los flujos de trabajo de Integración Continua.
├── assets/                 # Archivos de prueba (imágenes, documentos, etc.).
├── pages/                  # Clases del Page Object Model (e.g., LoginPage.ts).
├── tests/                  # Archivos de especificaciones de las pruebas.
│   ├── auth.setup.ts       # Configuración de la autenticación global.
│   └── *.spec.ts           # Pruebas funcionales.
├── utils/                  # Utilidades y configuración global.
├── playwright.config.ts    # Archivo principal de configuración de Playwright.
└── package.json            # Dependencias y scripts del proyecto.
🤖 Integración Continua
El flujo de trabajo definido en .github/workflows/playwright.yml se encarga de:

Verificar el código del repositorio.

Instalar Node.js y las dependencias.

Instalar los navegadores de Playwright.

Ejecutar todas las pruebas.

Subir el reporte de resultados como un artefacto en GitHub Actions para su posterior análisis.