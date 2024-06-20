-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2024 a las 14:43:01
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pablo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `idimagen` bigint(5) NOT NULL,
  `pacienteid` bigint(5) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `comentario` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mutual`
--

CREATE TABLE `mutual` (
  `idmutual` bigint(5) NOT NULL,
  `nombremutual` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mutual`
--

INSERT INTO `mutual` (`idmutual`, `nombremutual`) VALUES
(1, 'IOMA'),
(2, 'PRIVADO'),
(4, 'O.S.A.R.P.Y.H.'),
(12, 'OSDE'),
(13, 'PAMI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `idpaciente` bigint(5) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` bigint(10) DEFAULT NULL,
  `estatus` int(1) DEFAULT 1,
  `calle` varchar(20) DEFAULT NULL,
  `numero` int(5) DEFAULT NULL,
  `patologia` varchar(50) DEFAULT NULL,
  `patasoc` varchar(50) DEFAULT NULL,
  `fechacirugia` date DEFAULT NULL,
  `mutualid` bigint(5) NOT NULL,
  `afiliado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`idpaciente`, `nombre`, `apellido`, `telefono`, `estatus`, `calle`, `numero`, `patologia`, `patasoc`, `fechacirugia`, `mutualid`, `afiliado`) VALUES
(330, 'Héctor', 'Ferreccio', 2234263727, 1, 'San Luis', 3864, '', '', '0000-00-00', 1, ''),
(331, 'Pablo', 'Ferreccio', 2235787878, 1, '', 0, '', '', '0000-00-00', 2, ''),
(332, 'Dato ', 'Graciela', 2234564578, 1, '', 0, '', '', '0000-00-00', 1, ''),
(333, 'Esteban', 'Ferreccio', 2235415263, 1, '', 0, '', '', '0000-00-00', 12, ''),
(334, 'Natalia', 'Ferreccio', 2234121212, 1, '', 0, '', '', '0000-00-00', 4, ''),
(335, 'Ailen', 'Centurion', 22345214578, 1, '', 0, '', '', '0000-00-00', 4, ''),
(336, 'Gastón', 'Centurión', 2234897845, 1, '', 0, '', '', '0000-00-00', 12, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `idsesion` int(5) NOT NULL,
  `pacienteid` bigint(5) NOT NULL,
  `cantidad` int(2) NOT NULL,
  `usadas` int(2) NOT NULL,
  `tanda` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `idturnos` bigint(5) NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp(),
  `fechafin` timestamp NULL DEFAULT current_timestamp(),
  `observac` varchar(250) DEFAULT NULL,
  `idpaciente` bigint(5) NOT NULL,
  `cantidad` int(3) DEFAULT NULL,
  `usadas` int(3) DEFAULT NULL,
  `tanda` int(3) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`idturnos`, `fecha`, `fechafin`, `observac`, `idpaciente`, `cantidad`, `usadas`, `tanda`, `estado`) VALUES
(933, NULL, NULL, '', 330, 0, 0, 0, 0),
(934, NULL, NULL, '', 330, 0, 0, 0, 1),
(935, '2024-06-13 11:15:00', '2024-06-13 11:45:00', '', 330, 0, 0, 0, 0),
(936, NULL, NULL, '', 330, 3, 0, 1, 0),
(937, '2024-06-13 12:00:00', '2024-06-13 12:30:00', '', 330, 3, 1, 1, 0),
(938, NULL, NULL, '', 331, 0, 0, 0, 2),
(939, '2024-06-14 11:15:00', '2024-06-14 11:45:00', '', 331, 0, 1, 0, 2),
(940, '2024-06-12 21:00:51', '2024-06-12 21:30:51', '', 332, 0, 0, 0, 0),
(941, NULL, NULL, NULL, 333, 3, 0, 1, 0),
(942, '2024-06-14 12:15:00', '2024-06-14 12:45:00', '', 333, 3, 1, 1, 0),
(943, NULL, NULL, NULL, 334, 0, 0, 0, 0),
(944, '2024-06-15 11:30:00', '2024-06-15 12:00:00', '', 334, 0, 1, 0, 0),
(945, NULL, NULL, '', 335, 0, 0, 0, 0),
(946, '2024-06-12 21:05:13', '2024-06-12 21:35:13', '', 335, 4, 1, 1, 0),
(947, '2024-06-15 12:15:00', '2024-06-15 12:45:00', '', 335, 4, 2, 1, 0),
(948, NULL, NULL, '', 336, 3, 0, 1, 0),
(949, '2024-06-21 11:15:00', '2024-06-21 11:45:00', '', 336, 3, 1, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`idimagen`),
  ADD KEY `pacienteid` (`pacienteid`);

--
-- Indices de la tabla `mutual`
--
ALTER TABLE `mutual`
  ADD PRIMARY KEY (`idmutual`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`idpaciente`),
  ADD KEY `mutualid` (`mutualid`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`idsesion`),
  ADD KEY `pacienteid` (`pacienteid`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`idturnos`),
  ADD KEY `turnos_paciente` (`idpaciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `idimagen` bigint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `mutual`
--
ALTER TABLE `mutual`
  MODIFY `idmutual` bigint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `idpaciente` bigint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `idsesion` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `idturnos` bigint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=950;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`pacienteid`) REFERENCES `pacientes` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`mutualid`) REFERENCES `mutual` (`idmutual`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`pacienteid`) REFERENCES `pacientes` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_paciente` FOREIGN KEY (`idpaciente`) REFERENCES `pacientes` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
