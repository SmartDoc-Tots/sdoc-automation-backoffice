# Automatización de Pruebas para Backoffice (sdoc-automation-backoffice)

Este repositorio contiene un conjunto de pruebas automatizadas de extremo a extremo (E2E) para la aplicación de backoffice de SmartDoc. El proyecto está desarrollado con **Playwright** y **TypeScript** para garantizar la calidad y el correcto funcionamiento de las funcionalidades clave de la plataforma.

## 🚀 Propósito del Proyecto

El objetivo principal de este proyecto es automatizar las pruebas de regresión y verificar nuevas funcionalidades de forma rápida y fiable. Esto nos permite detectar errores de manera temprana, agilizar el ciclo de desarrollo y asegurar una experiencia de usuario estable para los administradores del sistema.

## ✨ Características Principales

* **Framework Moderno:** Utiliza Playwright para pruebas rápidas, fiables y con manejo automático de esperas.
* **Patrón de Diseño Page Object Model (POM):** El código está organizado en `pages` para separar la lógica de las pruebas de los selectores, facilitando el mantenimiento a largo plazo.
* **Autenticación Híbrida:**
    * **Global:** Flujo `auth.setup.ts` que inicia sesión una sola vez y reutiliza el estado (cookies) para pruebas de funcionalidades internas, ahorrando tiempo.
    * **Aislada:** Capacidad de ejecutar pruebas de Login "limpias" (sin estado previo) para validar credenciales y seguridad.
* **Ejecución Manual Paramétrica:** Integración con GitHub Actions para disparar pruebas bajo demanda seleccionando el navegador específico.
* **Integración Continua (CI):** Ejecución automática en cada `push`/`pull_request` y monitoreo diario programado.
* **Reportes y Notificaciones:** Reportes HTML detallados y alertas automáticas a **Discord** en caso de fallos (diferenciando errores de credenciales vs. errores de aplicación).

## 🛠️ Tecnologías Utilizadas

* Playwright
* TypeScript
* Node.js
* GitHub Actions

## 📦 Prerrequisitos

Asegúrate de tener instalado **Node.js** en tu sistema (se recomienda la versión 18 o superior).

## ⚙️ Instalación y Configuración

1.  **Clona el repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd sdoc-automation-backoffice
    ```

2.  **Instala las dependencias:**
    Se recomienda usar `npm ci` para una instalación limpia basada en el lockfile.
    ```bash
    npm ci
    ```

3.  **Instala los navegadores de Playwright:**
    ```bash
    npx playwright install --with-deps
    ```

4.  **Configura las credenciales:**
    Las credenciales de prueba se encuentran en `utils/config.ts` (o variables de entorno). Ajusta la URL y los datos de acceso para tu entorno local.

## ▶️ Ejecución de las Pruebas (Local)

Puedes ejecutar las pruebas utilizando los siguientes comandos:

* **Ejecutar todas las pruebas (Suite completa):**
    ```bash
    npx playwright test
    ```

* **Ejecutar el test de Login aislado (sin usar auth global):**
    Ideal para depurar problemas de acceso.
    ```bash
    npx playwright test tests/login.spec.ts
    ```

* **Ejecutar en un navegador específico:**
    ```bash
    npx playwright test --project="firefox"
    # O para Chrome real:
    npx playwright test --project="Google Chrome"
    ```

* **Ejecutar en modo UI (Interfaz Gráfica):**
    ```bash
    npx playwright test --ui
    ```

* **Ver el reporte de resultados:**
    ```bash
    npx playwright show-report
    ```

## 🤖 Integración Continua y Ejecución en la Nube

El flujo de trabajo definido en `.github/workflows/playwright.yml` gestiona la calidad en la nube.

### Ejecución Automática
* Se activa en cada `push` o `pull_request` a `main`.
* Se ejecuta de forma programada (Cron) para monitoreo diario.

### 🖐️ Ejecución Manual (GitHub Actions)
Este proyecto permite disparar ejecuciones manuales para validar navegadores específicos sin necesidad de hacer un commit:

1.  Ve a la pestaña **Actions** en el repositorio de GitHub.
2.  Selecciona el workflow **"Run Login Test Only"** (o el workflow general según corresponda).
3.  Haz clic en el botón **"Run workflow"**.
4.  Selecciona el navegador deseado en el menú desplegable (ej. `firefox`, `webkit`, `Google Chrome`).
5.  Haz clic en el botón verde **"Run workflow"**.

---

## 📂 Estructura del Proyecto

```text
/
├── .github/workflows/      # Workflows de CI/CD (incluye dispatch manual).
├── assets/                 # Archivos de prueba (imágenes, documentos).
├── pages/                  # Page Object Model (e.g., LoginPage.ts).
├── tests/                  # Specs de pruebas.
│   ├── auth.setup.ts       # Configuración de autenticación global.
│   └── login.spec.ts       # Test de login aislado.
├── utils/                  # Utilidades y configuración.
├── playwright.config.ts    # Configuración principal.
└── package.json            # Dependencias.