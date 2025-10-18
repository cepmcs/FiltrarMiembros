# FiltrarMiembros

Aplicación web sencilla para a filtrar miembros de un canal de YouTube por su nivel actual y descargar la lista resultante en formato TXT. Pensado para creadores que exportan sus miembros como CSV y necesitan una manera rápida de segmentarlos.

## Requisitos

- Navegador
- Archivo CSV que incluya al menos las columnas `Nivel actual` y `Miembro`.

## Uso

1. Abre `index.html` en tu navegador.
2. Sube el CSV exportado desde YouTube.
3. Elige un nivel en el desplegable (se llena automáticamente con los niveles encontrados).
4. Pulsa **Generar TXT** y descarga el archivo con los miembros filtrados.

## Desarrollo

El proyecto está construido con HTML, CSS y JavaScript, sin dependencias externas ni compilación. Para servirlo desde un servidor local puedes usar, por ejemplo:

