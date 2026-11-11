/**
 * ServiceModel.js - [MODEL]
 * Comprehensive Dual-Sector Enterprise Catalog:
 * Sector 1: Full-Stack IT & Cloud Engineering (Web, Mobile App, AWS, SEO, MDM Security, Servers)
 * Sector 2: Non-IT Wholesale Consumer Electronics & Regional Distribution Supply Chain
 */

export const ServiceModel = {
  getItSecurityServices() {
    return [
      {
        id: 'it-web-dev',
        icon: 'Globe',
        title: 'Custom Web & Enterprise Portal Engineering',
        highlight: 'React 19 • Next.js • Microservices',
        description: 'Bespoke corporate websites, high-speed B2B dealer portals, and responsive e-commerce web applications built with modern 3D UI, zero-lag performance, and automated payment gateways.',
        features: [
          'Sub-second page load speeds & 99+ Core Web Vitals',
          'Scalable React, Next.js, & Tailwind CSS architecture',
          'Role-based multi-tier dealer dashboards & billing',
          'Seamless Razorpay, Stripe, and UPI payment integrations'
        ],
        badge: 'Web Solutions',
        category: 'IT Engineering'
      },
      {
        id: 'it-app-dev',
        icon: 'Smartphone',
        title: 'Native & Cross-Platform Mobile App Development',
        highlight: 'Android • iOS • Enterprise DPC',
        description: 'Production-ready mobile applications built with native Kotlin/Swift and cross-platform Flutter/React Native. Includes proprietary Android Enterprise Device Policy Controller (DPC) integration.',
        features: [
          'Foreground persistence with zero background throttling',
          'Offline-first SQLite local caching & cryptographic sync',
          'Push notifications via high-speed MQTT and FCM',
          'Custom MDM lock screens with real-time UPI QR overlay'
        ],
        badge: 'Mobile Apps',
        category: 'IT Engineering'
      },
      {
        id: 'it-cloud-aws',
        icon: 'Cloud',
        title: 'AWS Cloud Infrastructure & DevOps Architecture',
        highlight: 'AWS EC2 • S3 • RDS • CI/CD',
        description: 'Enterprise cloud hosting, automated multi-region backup systems, containerized Docker/Kubernetes clusters, and serverless architectures with guaranteed 99.99% high-availability uptime.',
        features: [
          'Elastic auto-scaling handling 100K+ concurrent requests',
          'Automated CI/CD GitHub deployment pipelines',
          'AWS RDS PostgreSQL/MongoDB managed database clusters',
          'CloudFront CDN edge caching for lightning asset delivery'
        ],
        badge: 'Cloud & DevOps',
        category: 'IT Engineering'
      },
      {
        id: 'it-mdm-lock',
        icon: 'ShieldAlert',
        title: 'Enterprise Hardware MDM Security (Sentinel OS)',
        highlight: 'Sub-1.2s Remote Lock Directive',
        description: 'Military-grade Android Device Policy Controller. Instantly restricts delinquent financed smartphones with sub-second MQTT push directives, blocking factory reset and ADB debugging.',
        features: [
          'Permanent ADB & USB debugging port lockdown',
          'Hardware recovery key wipe & safe-mode bypass block',
          'Dynamic retail UPI payment recovery QR injection',
          'Auto-lock trigger if device disconnected > 72 hours'
        ],
        badge: 'Hardware FinTech',
        category: 'IT Security'
      },
      {
        id: 'it-cyber-defense',
        icon: 'KeyRound',
        title: 'Cyber Security, Penetration Testing & API Defense',
        highlight: 'TLS 1.3 • Zero-Trust • OWASP Top 10',
        description: 'Comprehensive cyber defense pipelines including automated vulnerability scanners, OAuth 2.0 / JWT authentication audits, end-to-end data encryption, and cloud firewall defenses.',
        features: [
          'End-to-end TLS 1.3 cryptographic data transmission',
          'DDoS mitigation and automated bot traffic scrubbing',
          'Strict RBAC permission guards across API microservices',
          'Automated security log auditing and telemetry anomaly alerts'
        ],
        badge: 'Cyber Defense',
        category: 'IT Security'
      },
      {
        id: 'it-seo-growth',
        icon: 'TrendingUp',
        title: 'Technical SEO, Digital Growth & Web Optimization',
        highlight: 'Google Top Rank • Core Web Vitals 95+',
        description: 'Data-driven Search Engine Optimization, automated JSON-LD schema generation, keyword taxonomy mapping, and conversion-rate optimization (CRO) to maximize organic search authority.',
        features: [
          'Targeted keyword dominance across Tier-1/2/3 local markets',
          'Semantic schema markup for rich Google search snippets',
          'Asset compression and lazy hydration for 95+ PageSpeed',
          'Google Analytics 4 & Search Console behavioral tracking'
        ],
        badge: 'SEO & Growth',
        category: 'IT Marketing'
      },
      {
        id: 'it-backend-servers',
        icon: 'Cpu',
        title: 'High-Throughput Backend & Real-time Database Servers',
        highlight: 'Node.js • Express • MongoDB • Redis',
        description: 'Battle-tested backend microservices engineered for high concurrency, real-time WebSocket telemetry, transaction safety, and sub-10ms database query response times.',
        features: [
          'Clustered Node.js architecture with event-driven brokers',
          'Redis in-memory caching for sub-5ms session lookups',
          'Sharded MongoDB and ACID-compliant transaction journals',
          'High-throughput MQTT broker managing 50,000+ active pings'
        ],
        badge: 'Backend Core',
        category: 'IT Engineering'
      }
    ];
  },

  getNonItServices() {
    return [
      {
        id: 'non-it-appliances',
        icon: 'Tv',
        title: 'Wholesale Smart Home & Consumer Appliances',
        highlight: 'B2B Showroom Margins Up To 35%',
        description: 'Direct factory wholesale distribution of high-demand 4K Ultra HD Smart TVs, Inverter Refrigerators, Energy-efficient Split ACs, and Home Entertainment appliances for offline showrooms.',
        features: [
          'Bulk wholesale dispatch directly from factory manufacturing lines',
          'Full 1+2 Year official manufacturer replacement warranties',
          'Doorstep delivery with scheduled white-glove installation',
          'Special credit line & bulk dealer discounts for DXHUB partners'
        ],
        badge: 'Smart Appliances',
        category: 'Wholesale Non-IT'
      },
      {
        id: 'non-it-electronics',
        icon: 'Smartphone',
        title: 'Financed 5G Mobiles & Cellular Gadgets Fleet',
        highlight: 'Fast-Moving Showroom Stock',
        description: 'Priority retail allocation of high-demand 5G smartphones, 4G cellular smartwatches with eSIM capability, wireless audio gear, and lifestyle electronics at wholesale showroom rates.',
        features: [
          'Instant IMEI enrollment into Sentinel MDM security on unboxing',
          'Top brands: Samsung, Realme, Xiaomi, OnePlus inventory pools',
          'High customer footfall turnover with zero financing credit risk',
          'Comprehensive dealer consignment and restocking agreements'
        ],
        badge: 'Mobile Fleet',
        category: 'Wholesale Non-IT'
      },
      {
        id: 'non-it-chargers',
        icon: 'Zap',
        title: 'Showroom GaN 65W Fast Chargers & Counter Accessories',
        highlight: 'High Margin Retail Goods (Up To 45%)',
        description: 'Ultra-compact Gallium Nitride (GaN) III multi-port chargers, heavy-duty braided 100W Type-C cables, 20,000mAh dual-input powerbanks, and high-impact showroom retail counter racks.',
        features: [
          'Industry-best retail profit margins up to 45% per unit sold',
          'Bureau of Indian Standards (BIS) certified safety design',
          'Eye-catching acrylic counter-top display merchandiser kits',
          '1-Year unconditional counter replacement warranty policy'
        ],
        badge: 'High Margin Retail',
        category: 'Wholesale Non-IT'
      },
      {
        id: 'non-it-supply-chain',
        icon: 'Layers',
        title: '4-Tier Regional Supply Chain & Dealer Network',
        highlight: 'Zonal Apex to Point-of-Sale Counters',
        description: 'Structured multi-district distribution network connecting Super Distributors, City Master Distributors, and 3,200+ local retail store owners with automated ledger accounting.',
        features: [
          'Protected exclusive territorial dealer rights across districts',
          'Automated wholesale inventory order placement via digital portal',
          'Real-time shipment tracking from zonal warehouse to showroom',
          'Transparent multi-tier volume rebate incentives and bonuses'
        ],
        badge: 'Supply Chain',
        category: 'Distribution Network'
      },
      {
        id: 'non-it-logistics',
        icon: 'Store',
        title: 'Express Doorstep Regional Freight & Transit Logistics',
        highlight: 'Sub-48-Hour Regional Delivery SLA',
        description: 'Dedicated insured freight distribution network catering to Tier-2, Tier-3, and rural district showrooms with real-time GPS fleet tracking and zero-damage guarantee.',
        features: [
          '100% insured transit coverage against damage or loss',
          'Sub-48-hour delivery timeline to remote retail partner locations',
          'Reverse logistics management for prompt warranty replacements',
          'Centralized warehouse fulfillment nodes across major state hubs'
        ],
        badge: 'Freight Logistics',
        category: 'Distribution Network'
      },
      {
        id: 'non-it-turnkey',
        icon: 'Sparkles',
        title: 'Turnkey Retail Showroom Modernization & POS Setup',
        highlight: 'Complete Store Transformation',
        description: 'All-inclusive equipment and branding setup for modern mobile and electronic retail showrooms, including anti-theft live tethering display stands, POS billing machines, and LED signage.',
        features: [
          'Commercial-grade anti-theft tethered device security alarm stands',
          'Integrated POS thermal receipt billing printers & barcode scanners',
          'Custom backlit acrylic LED fascia boards and shop branding kits',
          'Hands-on staff training for Android Enterprise 6-tap provisioning'
        ],
        badge: 'Turnkey Retail',
        category: 'Showroom Modernization'
      }
    ];
  }
};

