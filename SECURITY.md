# Seguridad del Proyecto - demo2

## Supply Chain Attack Protection

Este proyecto está protegido contra ataques de cadena de suministro (supply chain attacks) mediante configuración de seguridad en `.npmrc`.

### Defensas Implementadas

#### 1. **Bloqueo de Scripts de Instalación**
```
ignore-scripts=true
allow-scripts=false
```
- Previene que dependencias ejecuten código arbitrario durante la instalación
- Solo permite scripts explícitos cuando sea necesario

#### 2. **Retraso Mínimo de Lanzamiento (minimumReleaseAge)**
```
minimumReleaseAge=1440
```
- No instala versiones publicadas el mismo día
- 1440 minutos = 24 horas
- Evita instalar paquetes comprometidos recientes

#### 3. **Verificación de Integridad**
```
verify-store-integrity=true
```
- Verifica que los paquetes no hayan sido modificados
- Detecta cambios en el almacén local

#### 4. **Gestor de Paquetes Seguro**
```
package-manager=pnpm@11
```
- pnpm 11 viene con defensas por defecto
- Mejor aislamiento de dependencias que npm/yarn

---

## Incidente Reciente (Mayo 2026)

**Paquetes Comprometidos:** TanStack (bibliotecas populares en JavaScript)

**Método de Ataque:** Scripts `preinstall` y `postinstall` que se ejecutaban durante instalación

**Propagación:** TanStack → Mistral → OpenSearch → UiPath → PyPI

**Solución:** Las defensas implementadas en este proyecto previenen este tipo de ataques.

---

## Cómo Usar el Proyecto de Forma Segura

### Instalación Inicial
```bash
# Instalar pnpm 11 globalmente
npm install -g pnpm@11

# En el proyecto
pnpm install
```

### Agregar Nuevas Dependencias
```bash
# Instala con las defensas de seguridad
pnpm add [nombre-paquete]

# Si necesitas ejecutar scripts (ej: postinstall)
pnpm add --allow-scripts [nombre-paquete]
```

### Auditoría de Seguridad
```bash
# Verificar vulnerabilidades conocidas
pnpm audit

# Actualizar paquetes de forma segura
pnpm update
```

---

## Configuración Detallada (.npmrc)

| Configuración | Valor | Propósito |
|---|---|---|
| `ignore-scripts` | true | Bloquea scripts durante instalación |
| `allow-scripts` | false | Requiere aprobación explícita |
| `minimumReleaseAge` | 1440 | Espera 24h antes de instalar |
| `verify-store-integrity` | true | Verifica integridad de paquetes |
| `lockfile-version` | 5.4 | Lockfile más seguro |
| `package-manager` | pnpm@11 | Gestor con defensas integradas |

---

## Recomendaciones Adicionales

1. **Mantén pnpm actualizado**
   ```bash
   pnpm install -g pnpm@latest
   ```

2. **Revisa `pnpm-lock.yaml` regularmente**
   - Detecta cambios sospechosos en dependencias

3. **Usa `pnpm audit` antes de deployments**
   ```bash
   pnpm audit --fix
   ```

4. **Monitorea dependencias**
   - Usa herramientas como Snyk o Dependabot
   - Recibe alertas de vulnerabilidades

5. **Actualiza regularmente**
   - Mantén Node.js actualizado
   - Mantén pnpm actualizado
   - Actualiza dependencias mensualmente

---

## Referencias

- [pnpm Security](https://pnpm.io/security)
- [npm Security Best Practices](https://docs.npmjs.com/cli/v10/using-npm/security)
- [OWASP Supply Chain Attacks](https://owasp.org/www-community/attacks/Supply_Chain_Attack)

---

## Contacto

Si encuentras vulnerabilidades de seguridad, reporta a través de los canales apropiados.
No publiques vulnerabilidades públicamente sin dar tiempo para que se corrijan.
