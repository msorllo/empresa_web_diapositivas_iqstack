/**
 * IQSTACK Presentation Data Store - Expanded Version
 * Includes comprehensive information from TFG.pdf, IQ STACK.pdf, and PESTEL/Porter/Scrum details.
 */

const IQSTACK_DATA = {
  project: {
    name: "IQ STACK",
    slogan: "Hosting Ecológico & Control Solar de Alto Rendimiento",
    tagline: "Tecnología que funciona, valores que importan.",
    website: "www.iqstack.es",
    email: "contacto@iqstack.es",
    location: "Benicarló, Castellón",
    institution: "Joan Coromines (Benicarló)"
  },
  
  // Slide Content Store (combining commercial web views and academic TFG details)
  slides: [
    {
      id: "slide-1",
      number: 1,
      title: "IQ STACK",
      subtitle: "Hosting Ecológico & Control Solar de Alto Rendimiento",
      webDescription: {
        title: "Tecnología que funciona, valores que importan",
        content: "Una alternativa de hosting real, verde y sobre todo, humana. Ofrecemos alojamiento de alto rendimiento alimentado 100% por energía solar propia y un acompañamiento digital cercano sin chatbots."
      },
      tfgDescription: {
        title: "Proyecto Final de Ciclo Formativo",
        content: "Este proyecto nace como una iniciativa académica de estudiantes de Sistemas Microinformáticos y Redes del Instituto Joan Coromines de Benicarló. Combina la viabilidad técnica de sistemas abiertos, economía circular y la autonomía energética solar con un modelo de negocio sostenible y rentable."
      },
      notes: "Buenos días. Hoy presentamos IQ STACK, un proyecto surgido en las aulas del Joan Coromines de Benicarló. En un mundo donde internet ya contamina como toda la aviación civil, proponemos un hosting ecológico y real, uniendo la sostenibilidad fotovoltaica con el acompañamiento humano sin contestadores automáticos."
    },
    {
      id: "slide-2",
      number: 2,
      title: "El Problema",
      subtitle: "La Desconexión del Sector Digital",
      webDescription: {
        title: "Las barreras de la nube tradicional",
        problems: [
          { title: "Huella Invisible", desc: "Servidores encendidos 24/7 alimentados por combustibles fósiles altamente contaminantes.", metric: "4% de las emisiones globales son digitales" },
          { title: "Soporte Frío", desc: "Chatbots preprogramados e interfaces deshumanizadas que frustran al usuario local.", metric: "80% prefiere atención por humanos" },
          { title: "Miedo Técnico", desc: "Paneles confusos y terminología compleja que asusta a PYMEs y ONGs locales.", metric: "65% de pequeñas empresas temen la nube" }
        ]
      },
      tfgDescription: {
        title: "Justificación Académica del TFG",
        content: "Identificamos una brecha de digitalización crítica en las PYMEs del Baix Maestrat debido a la falta de conocimientos técnicos y a la desconfianza por la despersonalización del soporte. Paralelamente, el impacto ecológico digital (residuos y consumo de red) es ignorado por las operadoras low-cost. IQSTACK aborda esta doble problemática mediante hosting verde local y un modelo de co-working/tutorías."
      },
      notes: "¿Cuál es el panorama de una panadería o asociación de Benicarló al digitalizarse? Se topa con tres muros: contaminación invisible, chatbots frustrantes y paneles incomprensibles. La tecnología se ha desconectado de las personas."
    },
    {
      id: "slide-3",
      number: 3,
      title: "La Solución",
      subtitle: "Nuestra Propuesta de Valor Sostenible",
      webDescription: {
        title: "Hosting Solar y Acompañamiento Humano",
        features: [
          { title: "Hosting 100% Verde", desc: "Servidores eficientes conectados a paneles solares y almacenamiento local en baterías." },
          { title: "Panel de Métricas Claras", desc: "El cliente ve en tiempo real su consumo en kWh, el CO₂ evitado y árboles equivalentes." },
          { title: "Videollamada Mensual", desc: "Un asesor técnico real revisa la web del cliente cara a cara para resolver dudas." }
        ]
      },
      tfgDescription: {
        title: "Niveles de Producto y Prototipo (Eco-Design)",
        levels: [
          { name: "Nivel Básico (Presencia)", desc: "Alojamiento web funcional, rápido y estable." },
          { name: "Nivel Formal (Diferencial)", desc: "Dominio, SSL y Panel con métricas dinámicas de CO₂ evitado." },
          { name: "Nivel Aumentado (Valor)", desc: "Formación digital integrada y auditorías periódicas de ciberseguridad." }
        ],
        uxConcept: "Interfaz minimalista UX 'Eco-Design' que reduce la cantidad de transferencias de datos, optimizando el consumo del procesador del cliente y del servidor."
      },
      notes: "Nuestra propuesta no es solo vender espacio en disco; es ofrecer acompañamiento sostenible. Diseñamos un panel de control interactivo donde ver el ahorro ecológico e incluimos videollamadas mensuales para resolver dudas cara a cara."
    },
    {
      id: "slide-4",
      number: 4,
      title: "Infraestructura",
      subtitle: "Flujo Energético y Topología de Red",
      webDescription: {
        title: "El Ciclo de la Energía Verde",
        nodes: [
          { label: "Sol", desc: "Energía fotovoltaica capturada por paneles." },
          { label: "Placas", desc: "Generación eléctrica limpia a coste cero." },
          { label: "Baterías", desc: "Garantía de autonomía ininterrumpida 24/7." },
          { label: "Servidores", desc: "Equipos de bajo consumo optimizados en Linux." }
        ]
      },
      tfgDescription: {
        title: "Diseño Técnico del Sistema y Economía Circular",
        hardware: "Economía Circular: Servidores empresariales reacondicionados Dell/HP, reduciendo la basura electrónica y la huella de carbono de fabricación.",
        software: "Kernel Linux Open Source optimizado con caché de memoria (RAM) y SQLite integrado para reducir al mínimo los accesos a disco físico.",
        diagram: "INFO/redproyecto_Andrei_Hugo_Marco_Unai.drawio.png" // Path to project network image
      },
      notes: "El hardware IQSTACK es de bajo consumo y reacondicionado (economía circular), el software está optimizado en Linux y la energía fluye directamente del sol a nuestras placas y acumuladores."
    },
    {
      id: "slide-5",
      number: 5,
      title: "El Equipo",
      subtitle: "Perfiles Complementarios y Metodología",
      webDescription: {
        title: "Compañeros Técnicos y Proactivos",
        members: [
          { name: "Unai Arnau (CEO)", role: "Dirección General & DevOps", detail: "Gestión de infraestructura y redes Linux." },
          { name: "Marco Sorlí (CTO)", role: "Desarrollo & Backend", detail: "Arquitecturas eficientes y bases de datos." },
          { name: "Hugo Matías (CMO)", role: "Ciberseguridad & Marketing", detail: "Auditoría de seguridad y penetración comercial." },
          { name: "Andrei Chivu (CFO)", role: "Finanzas & Legal", detail: "Control presupuestario y viabilidad contable." }
        ]
      },
      tfgDescription: {
        title: "Metodología de Trabajo: Scrum Ágil",
        sprints: "Trabajamos en Sprints de 2 semanas estructurando tareas en Trello y canales de Slack, huyendo del caos de WhatsApp.",
        ceremonies: [
          { name: "Sprint Planning", desc: "Lunes mañana. Votamos tareas del Product Backlog prioritarias para no saturar al equipo." },
          { name: "Daily Stand-up", desc: "Reunión de 15 minutos diaria respondiendo: ¿Qué hice ayer?, ¿Qué haré hoy?, ¿Qué me bloquea?" },
          { name: "Review & Retro", desc: "Análisis técnico de entregas y retroalimentación interna para la resolución de conflictos." }
        ]
      },
      notes: "Somos 4 técnicos con perfiles muy complementarios. Para trabajar de manera ágil y adaptarnos rápido a las necesidades de las pymes locales, implementamos Scrum con reuniones de planificación y daily stand-ups coordinados."
    },
    {
      id: "slide-6",
      number: 6,
      title: "Arquitectura",
      subtitle: "Robustez por Diseño y Principios Clean",
      webDescription: {
        title: "Estructura Limpia y Separada (SoC)",
        layers: [
          { name: "UI Reactiva (Frontend)", desc: "Diseño 'tonto' sin frameworks pesados, ultrarrápida." },
          { name: "API & Wrappers", desc: "Independencia de librerías para proteger el código ante cambios." },
          { name: "Base de Datos Local", desc: "Persistencia rápida mediante ficheros autocontenidos." }
        ]
      },
      tfgDescription: {
        title: "Arquitectura y Persistencia Portable (SQLite)",
        cleanCode: "Separación estricta de responsabilidades (SoC). La lógica no sabe cómo se pinta el dato; la interfaz no calcula procesos.",
        sqliteBenefits: [
          { title: "Despliegue Inmediato", desc: "Toda la base de datos reside en un solo fichero portable (.db)." },
          { title: "Copias de Seguridad Fáciles", desc: "Un backup completo es una copia de archivo instantánea sin congelar servidores." },
          { title: "Eficiencia", desc: "Consumo de RAM y procesamiento ínfimo comparado con motores SQL de red." }
        ]
      },
      notes: "Nuestra arquitectura se basa en la separación estricta de responsabilidades. La interfaz es reactiva y la persistencia corre sobre SQLite autocontenido, facilitando copias de seguridad inmediatas y despliegues sin fricciones."
    },
    {
      id: "slide-7",
      number: 7,
      title: "Mercado",
      subtitle: "Análisis Estratégico PESTEL & Porter",
      webDescription: {
        title: "Una Propuesta de Nicho",
        nicho: "Nos enfocamos en el 80% de usuarios locales desatendidos que prefieren soporte cercano y cercanía ecológica sobre precios extremadamente bajos."
      },
      tfgDescription: {
        title: "Análisis de Mercado Avanzado",
        pestel: [
          { factor: "Político/Legal", desc: "Pacto Verde Europeo (neutralidad digital) y ayudas Kit Digital (España Digital 2026)." },
          { factor: "Económico", desc: "Mercado Cloud crece un 10% anual. La energía solar protege ante la volatilidad de la luz." },
          { factor: "Social/Tecnológico", desc: "Sostenibilidad valorada por clientes (RSC). Fibra óptica de alta velocidad en Benicarló." }
        ],
        porter5: [
          { fuerza: "1. Rivalidad", nivel: "ALTA", mitigacion: "Competimos en cercanía, soporte cara a cara y no en guerras de precios low-cost." },
          { fuerza: "2. Clientes", nivel: "MEDIA-ALTA", mitigacion: "Fidelización sin permanencia. Si se sienten cuidados, no se van por ahorrar 2€." },
          { fuerza: "3. Proveedores", nivel: "MEDIA", mitigacion: "Uso de placas solares propias para anular el poder de las eléctricas." },
          { fuerza: "4. Sustitutos", nivel: "ALTA", mitigacion: "Frente a Wix/Shopify ('jardín cerrado'), enseñamos el valor de ser dueño de sus datos." }
        ]
      },
      notes: "El sector es competitivo, pero nos defendemos en Porter compitiendo en cercanía y no en precio. PESTEL nos favorece por las leyes verdes y la volatilidad eléctrica hace que la solar sea un excelente seguro financiero."
    },
    {
      id: "slide-8",
      number: 8,
      title: "Sostenibilidad",
      subtitle: "Presupuestos y Previsión de Tesorería",
      webDescription: {
        title: "Precios Transparentes y Viables",
        tariffs: [
          { name: "Plan Básico", price: "9,99 €/mes", desc: "Para webs y portfolios corporativos locales." },
          { name: "Plan PRO", price: "19,99 €/mes", desc: "Para e-commerce que requieren bases de datos y mayor CPU." },
          { name: "Descuento ONGs", price: "-20% Fijo", desc: "Apoyo prioritario para iniciativas comunitarias." }
        ]
      },
      tfgDescription: {
        title: "Viabilidad Económica (12 Meses)",
        capitalStructure: "Capital Inicial: 7.800€ totales (4.000€ capital propio de los 4 socios + 3.800€ campaña Crowdfunding/Preventa).",
        bootstrapping: "Salarios: 0€ el primer año (bootstrapping). Todos los beneficios se reinvierten en optimizar la instalación solar.",
        monthlyTable: [
          { month: 1, expenses: 7800, sales: 10, state: "Pérdida" },
          { month: 2, expenses: 8100, sales: 610, state: "Pérdida" },
          { month: 3, expenses: 8400, sales: 1410, state: "Pérdida" },
          { month: 4, expenses: 8700, sales: 2410, state: "Pérdida" },
          { month: 5, expenses: 9000, sales: 3410, state: "Pérdida" },
          { month: 6, expenses: 9300, sales: 4510, state: "Pérdida" },
          { month: 7, expenses: 9600, sales: 5610, state: "Pérdida" },
          { month: 8, expenses: 9900, sales: 6810, state: "Pérdida" },
          { month: 9, expenses: 10200, sales: 8010, state: "Pérdida" },
          { month: 10, expenses: 10500, sales: 9310, state: "Pérdida" },
          { month: 11, expenses: 10800, sales: 10610, state: "Punto de Cruce (Cruce)" },
          { month: 12, expenses: 11100, sales: 12010, state: "Beneficio" }
        ],
        kpis: "Ratio Solvencia: Alto. Endeudamiento bancario: 0%. El primer año prevemos un beneficio neto de 5.036€."
      },
      notes: "Financieramente necesitamos 7.800€ (socios + preventas). La tabla mensual del TFG demuestra que cruzamos el punto muerto cerca del final del año 1, arrojando un beneficio de 5.036€ reinvertible en hardware."
    },
    {
      id: "slide-9",
      number: 9,
      title: "Impacto",
      subtitle: "Alineación ODS y Forma Jurídica",
      webDescription: {
        title: "Tecnología con Corazón Social",
        ods: [
          { num: 7, label: "Energía Limpia", desc: "Infraestructura solar directa." },
          { num: 9, label: "Innovación Local", desc: "Impulsando pymes locales." },
          { num: 12, label: "Consumo Responsable", desc: "Menos basura digital." }
        ]
      },
      tfgDescription: {
        title: "Constitución Legal y Administrativa (S.L.)",
        legalForm: "Sociedad Limitada (S.L.): Aporta protección personal (responsabilidad limitada al capital aportado de 4.000€) y transmite seriedad comercial.",
        milestones: [
          { step: "1. Nombre", desc: "Certificado negativo de denominación en el Registro Mercantil Central." },
          { step: "2. Cuenta", desc: "Apertura de cuenta bancaria y depósito del capital social inicial." },
          { step: "3. Escritura", desc: "Firma de escritura de constitución y estatutos ante notario." },
          { step: "4. NIF & IAE", desc: "Obtención del NIF provisional y alta en IAE (Hacienda)." },
          { step: "5. Registro", desc: "Inscripción en el Registro Mercantil de Castellón." }
        ]
      },
      notes: "Para operar de forma legal y segura, nos constituimos como S.L. con responsabilidad limitada. Nos alineamos con la Agenda 2030 en los ODS 7, 9 y 12 impulsando el desarrollo sostenible de nuestra comarca."
    },
    {
      id: "slide-10",
      number: 10,
      title: "Conclusión",
      subtitle: "Viabilidad y Próximos Pasos del Proyecto",
      webDescription: {
        title: "Un Proyecto Listo para Despegar",
        closing: "Queremos demostrar que se puede ofrecer hosting verde, tratar a los clientes como personas y generar beneficios. Te invitamos a unirte al cambio."
      },
      tfgDescription: {
        title: "Conclusiones de Viabilidad (TFG Joan Coromines)",
        conclusions: [
          { title: "Viabilidad Técnica", desc: "Demostrada mediante optimización de hardware reacondicionado y software de código abierto." },
          { title: "Viabilidad Económica", desc: "Estructura ligera de costes fijos mínimos (Lean Startup) que anula el riesgo de quiebra." },
          { title: "Viabilidad Social", desc: "Existe un nicho local dispuesto a pagar por ética, ecología solar y cercanía humana." }
        ]
      },
      notes: "En conclusión, IQSTACK es técnicamente factible, financieramente seguro gracias a la estructura Lean, y socialmente validado. Estamos listos para llevar este proyecto de las aulas del Coromines a la realidad."
    }
  ]
};

// Expose globally
window.IQSTACK_DATA = IQSTACK_DATA;
