🤖 Registro de Auditoría de IA (AI-LOG)

Estudiante: Persona(s)
Semana: X
Proyecto: [Nombre del Proyecto/Taller]

1. Prompts Utilizados
●      "Escribe un Custom Hook en React Native con TypeScript para obtener la ubicación actual usando expo-location."

2. Código Generado vs. Código Modificado
●      ¿Qué generó la IA?: Un hook funcional pero utilizando console.log para los errores y sin tipar la interfaz de coordenadas.

●      ¿Qué modifiqué/corregí?: Agregué la interfaz TypeScript GeoLocationState y reemplacé el manejo de errores para que notifique a la UI mediante un estado explícito.

3. Alucinaciones o Errores Detectados
●      La IA intentó importar Permissions desde 'expo', lo cual está deprecado en la versión actual de Expo Go. Lo corregí usando Location.requestForegroundPermissionsAsync().

●    Ejemplo AI-LOG.md: 

# 🤖 Registro de Auditoría de IA (AI-LOG)
**Estudiante:** [Nombre del Estudiante]  
**Semana:** [Número de Semana]  

## 1. Prompts Utilizados
* *"Escribe un Custom Hook en React Native con TypeScript para obtener la ubicación actual usando expo-location."*

## 2. Código Generado vs. Código Modificado
* **¿Qué generó la IA?:** Un hook funcional pero utilizando `console.log` para los errores y sin tipar la interfaz de coordenadas.
* **¿Qué modifiqué/corregí?:** Agregué la interfaz TypeScript `GeoLocationState` y reemplacé el manejo de errores para que notifique a la UI mediante un estado.

## 3. Alucinaciones o Errores Detectados
* La IA intentó importar `Permissions` desde `'expo'`, lo cual está deprecado en la versión actual de Expo Go. Lo corregí usando `Location.requestForegroundPermissionsAsync()`.