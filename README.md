# Generación Impacto - Frontend

Frontend de la plataforma Generación Impacto construido con Angular 17.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar el servidor de desarrollo:
```bash
npm start
```

3. Abrir en el navegador:
```
http://localhost:4200
```

## Estructura del Proyecto

- `/src/app/models` - Modelos de datos TypeScript
- `/src/app/services` - Servicios para comunicación con el backend
- `/src/app/guards` - Guards de autenticación
- `/src/app/components` - Componentes compartidos (login, register)
- `/src/app/tutor` - Módulo para usuarios Tutores
- `/src/app/student` - Módulo para usuarios Estudiantes
- `/src/app/admin` - Módulo para usuarios Administradores
- `/src/app/shared` - Componentes compartidos (navbar, etc.)

## Notas

Este es un proyecto base. Los componentes adicionales siguen el mismo patrón:
- Componentes standalone de Angular
- Uso de ReactiveForms para formularios
- Servicios para llamadas HTTP al backend
- Estilos SCSS siguiendo la paleta de colores azul y blanco

## Componentes Pendientes de Crear

Siguiendo el patrón establecido, crear los siguientes componentes:

### Tutor:
- tutor-notifications
- tutor-finance
- tutor-students
- tutor-schedule

### Student:
- student-home
- student-announcements
- student-notifications
- student-reservations
- student-tutors

### Admin:
- admin-home
- admin-tutors
- admin-students
- admin-notifications
- admin-finance

Cada componente debe seguir la estructura:
- Component TypeScript con lógica
- Template HTML con la UI
- Estilos SCSS usando las variables CSS definidas
- Importar NavbarComponent y definir rutas




