# 🏆 Ajedrez Interactivo

Un juego de ajedrez completo desarrollado con HTML5, CSS3, JavaScript y Bootstrap 5. Disfruta de una experiencia moderna y visual para jugar ajedrez directamente en tu navegador.

![Ajedrez Screenshot](https://img.shields.io/badge/Status-Funcional-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)

<picture align="center">
    <img src="/assets/image.png">
</picture>

## ✨ Características Principales

### 🎮 Funcionalidades del Juego
- **Tablero interactivo 8x8** con piezas Unicode
- **Validación completa de movimientos** para todas las piezas
- **Sistema de turnos** alternados (blancas y negras)
- **Selección visual** de piezas y movimientos posibles
- **Detección de jaque mate** básica
- **Notación algebraica** simplificada

### 📊 Sistema de Estadísticas
- **Contador de partidas** jugadas
- **Registro de victorias** por color
- **Conteo de empates**
- **Historial de movimientos** en tiempo real
- **Persistencia de datos** en localStorage

### 🎨 Diseño Moderno
- **Interface responsive** con Bootstrap 5
- **Gradientes y animaciones** CSS suaves
- **Efectos hover** interactivos
- **Sombras y profundidad** visual
- **Panel lateral** de estadísticas

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias

### Instalación
**Descarga** o clona este repositorio
```bash
git clone https://github.com/Malibu54/Chess-Game.git
cd pages/chess.html
```

**¡Listo!** Ya puedes comenzar a jugar

## 🎯 Cómo Jugar

### Controles Básicos
1. **Seleccionar pieza**: Click en una pieza de tu color
2. **Ver movimientos**: Las casillas amarillas muestran movimientos posibles
3. **Mover pieza**: Click en una casilla válida de destino
4. **Deseleccionar**: Click en la misma pieza seleccionada

### Reglas Implementadas
- **Peón**: Avanza 1 casilla (2 en primer movimiento), captura en diagonal
- **Torre**: Movimiento horizontal y vertical ilimitado
- **Alfil**: Movimiento diagonal ilimitado
- **Caballo**: Movimiento en "L" (2+1 casillas)
- **Reina**: Combina torre y alfil
- **Rey**: 1 casilla en cualquier dirección

### Botones de Control
- **🆕 Nueva Partida**: Inicia una nueva partida
- **🔄 Reiniciar**: Reinicia la partida actual (con confirmación)


## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica del juego
- **CSS3**: Estilos, gradientes y animaciones
- **JavaScript ES6+**: Lógica del juego y validaciones
- **Bootstrap 5.3.2**: Framework CSS responsive

### Librerías Externas
- **Font Awesome 6.4.0**: Iconos vectoriales
- **Bootstrap Icons**: Iconografía adicional

### APIs del Navegador
- **localStorage**: Persistencia de estadísticas
- **DOM API**: Manipulación de elementos
- **Event Handling**: Interactividad del usuario

## 📚 Documentación Técnica

### Arquitectura del Código

#### Clase Principal: `ChessGame`
```javascript
class ChessGame {
    constructor()           // Inicialización del juego
    loadStats()            // Carga estadísticas guardadas
    initializeBoard()      // Crea el tablero DOM
    handleSquareClick()    // Maneja clicks en casillas
    isValidMove()          // Valida movimientos
    makeMove()             // Ejecuta un movimiento
    checkGameEnd()         // Verifica fin de partida
}
```

#### Validación de Movimientos
Cada pieza tiene su lógica específica:
- **Validación de límites** del tablero
- **Verificación de piezas propias** vs enemigas
- **Cálculo de trayectorias** para piezas de largo alcance
- **Detección de obstáculos** en el camino

#### Sistema de Estado
```javascript
// Estado del juego
{
    board: Array[8][8],     // Matriz del tablero
    currentPlayer: 'w'|'b', // Jugador actual
    selectedSquare: [x,y],  // Casilla seleccionada
    gameStatus: string,     // Estado de la partida
    moveHistory: Array      // Historial de movimientos
}
```

## 🎨 Personalización

### Cambiar Colores del Tablero
```css
.chess-square.white {
    background-color: #f0d9b5; /* Casillas claras */
}

.chess-square.black {
    background-color: #b58863; /* Casillas oscuras */
}
```

### Modificar Piezas
```javascript
// Cambiar representación de piezas
const pieces = {
    'wK': '♔', // Rey blanco
    'wQ': '♕', // Reina blanca
    // ... más piezas
};
```

### Ajustar Animaciones
```css
.chess-square {
    transition: all 0.3s ease; /* Velocidad de transición */
}
```

## 🧪 Testing

### Tests Manuales Recomendados
1. **Movimientos básicos** de todas las piezas
2. **Validación de capturas** propias y enemigas
3. **Detección de jaque mate** con diferentes escenarios
4. **Persistencia de estadísticas** al cerrar/abrir navegador
5. **Responsividad** en diferentes dispositivos

### Casos de Prueba
- [ ] Movimiento válido de peón (1 y 2 casillas)
- [ ] Captura diagonal de peón
- [ ] Movimiento de torre bloqueado por pieza
- [ ] Salto de caballo sobre piezas
- [ ] Movimiento diagonal de alfil
- [ ] Combinación de movimientos de reina
- [ ] Movimiento limitado del rey

## 🚧 Limitaciones Actuales

### Reglas No Implementadas
- **Enroque** (castling) corto y largo
- **Captura al paso** (en passant)
- **Promoción de peón** al llegar al final
- **Jaque** visual (solo jaque mate)
- **Tablas por repetición** o regla de 50 movimientos

### Mejoras Futuras
- [ ] IA para jugar contra la computadora
- [ ] Modo multijugador online
- [ ] Análisis de partidas
- [ ] Exportar/importar partidas en formato PGN
- [ ] Temas visuales personalizables
- [ ] Sonidos de movimiento
- [ ] Reloj de partida

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -am 'Agrega nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

### Áreas de Mejora
- Implementar reglas faltantes del ajedrez
- Mejorar la detección de jaque y jaque mate
- Agregar IA con diferentes niveles
- Optimizar rendimiento en dispositivos móviles
- Añadir tests automatizados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@malibu54](https://github.com/malibu54)
- LinkedIn: [Oriana Soledad](https://linkedin.com/in/orianasoledad)

## 🙏 Agradecimientos

- **Bootstrap Team** por el excelente framework CSS
- **Font Awesome** por los iconos vectoriales
- **Unicode Consortium** por los símbolos de ajedrez
- **Comunidad de desarrolladores** por inspiración y recursos

**⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub!**

*Desarrollado con ❤️ y mucho café ☕*

