import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'bogdan790/happybees.ro',
  },

  collections: {
    // ARTICOLE
    articole: collection({
      label: 'Articole',
      slugField: 'title',
      path: 'content/articole/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titlu Articol' } }),
        date: fields.date({ label: 'Dată Publicare', defaultValue: { kind: 'today' } }),
        categorie: fields.select({
          label: 'Categorie / Sezon',
          options: [
            { label: 'Primăvară', value: 'primavara' },
            { label: 'Vară', value: 'vara' },
            { label: 'Toamnă', value: 'toamna' },
            { label: 'Iarnă', value: 'iarna' },
            { label: 'General', value: 'general' },
          ],
          defaultValue: 'general',
        }),
        imagine_hero: fields.image({
          label: 'Imagine Hero',
          description: 'Imagine mare top articol (min 1920x1080px, 16:9)',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),
        imagine_card: fields.image({
          label: 'Imagine Card',
          description: 'Imagine card pentru listă (min 600x400px, 3:2)',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),
        rezumat: fields.text({
          label: 'Rezumat Scurt',
          description: 'Max 200 caractere pentru card',
          multiline: true,
        }),
        content: fields.markdoc({
          label: 'Conținut Articol',
          description: 'Conținut complet cu imagini inline',
        }),
      },
    }),

    // PRODUSE
    produse: collection({
      label: 'Produse',
      slugField: 'title',
      path: 'content/produse/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Nume Produs' } }),
        date: fields.date({ label: 'Dată Publicare', defaultValue: { kind: 'today' } }),
        pret: fields.number({
          label: 'Preț (RON)',
          description: 'Preț în RON',
        }),
        unitate: fields.text({
          label: 'Unitate',
          defaultValue: 'kg',
          description: 'ex: kg, 100g, 50ml',
        }),
        disponibilitate: fields.select({
          label: 'Disponibilitate',
          options: [
            { label: 'Disponibil', value: 'disponibil' },
            { label: 'Indisponibil', value: 'indisponibil' },
            { label: 'Stoc limitat', value: 'stoc-limitat' },
          ],
          defaultValue: 'disponibil',
        }),
        imagine: fields.image({
          label: 'Imagine Produs',
          description: 'Imagine principală (min 800x600px)',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),
        galerie: fields.array(
          fields.object({
            imagine: fields.image({
              label: 'Imagine',
              directory: 'static/images/uploads',
              publicPath: '/images/uploads/',
            }),
          }),
          {
            label: 'Galerie Imagini',
            description: 'Imagini suplimentare (2-6 imagini)',
            itemLabel: (props) => `Imagine ${props.fields.imagine.value || ''}`,
          }
        ),
        descriere_scurta: fields.text({
          label: 'Descriere Scurtă',
          description: 'Max 150 caractere pentru card',
          multiline: true,
        }),
        content: fields.markdoc({
          label: 'Descriere Completă',
        }),
        caracteristici: fields.array(
          fields.text({ label: 'Caracteristică' }),
          {
            label: 'Caracteristici',
            description: 'Lista cu bullet points',
            itemLabel: (props) => props.value,
          }
        ),
      },
    }),
  },

  singletons: {
    // CONFIGURARE GLOBALĂ SITE
    site: singleton({
      label: 'Configurare Site',
      path: 'data/site',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Titlu Site', defaultValue: 'Happy Bees - Stupina Bogdănel' }),
        description: fields.text({
          label: 'Descriere Site (SEO)',
          multiline: true,
          description: 'Meta description pentru SEO',
        }),
        keywords: fields.text({
          label: 'Cuvinte Cheie (SEO)',
          description: 'Separate prin virgulă',
        }),
        logo: fields.image({
          label: 'Logo Site',
          directory: 'static/images',
          publicPath: '/images/',
        }),
        cta_primary: fields.text({ label: 'Text Buton CTA Principal', defaultValue: 'Descoperă produsele' }),
        cta_secondary: fields.text({ label: 'Text Buton CTA Secundar', defaultValue: 'Trimite mesaj' }),
      },
    }),

    // MENIU PRINCIPAL
    menu: singleton({
      label: 'Meniu',
      path: 'data/menu',
      format: { data: 'yaml' },
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({ label: 'Text Meniu' }),
            url: fields.text({ label: 'Link' }),
            order: fields.number({ label: 'Ordine', defaultValue: 0 }),
          }),
          {
            label: 'Elemente Meniu',
            itemLabel: (props) => props.fields.label.value || 'Element meniu',
          }
        ),
      },
    }),

    // FOOTER
    footer: singleton({
      label: 'Footer',
      path: 'data/footer',
      format: { data: 'yaml' },
      schema: {
        about_text: fields.text({
          label: 'Text Despre (Footer)',
          multiline: true,
        }),
        copyright: fields.text({
          label: 'Text Copyright',
          defaultValue: '© 2024 Happy Bees - Stupina Bogdănel. Toate drepturile rezervate.',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Text Link' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Link-uri Footer',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        social: fields.object({
          facebook: fields.text({ label: 'Link Facebook' }),
          instagram: fields.text({ label: 'Link Instagram' }),
          email: fields.text({ label: 'Email Contact' }),
          phone: fields.text({ label: 'Telefon' }),
        }),
      },
    }),

    // HOMEPAGE
    homepage: singleton({
      label: 'Homepage',
      path: 'content/_index',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Titlu Pagină', defaultValue: 'Acasă' }),

        // HERO SECTION
        hero_titlu: fields.text({ label: 'Hero - Titlu Principal (H1)' }),
        hero_subtitlu: fields.text({ label: 'Hero - Subtitlu (H2)' }),
        hero_cta_text: fields.text({ label: 'Hero - Text Buton', defaultValue: 'Descoperă produsele' }),
        hero_cta_link: fields.text({ label: 'Hero - Link Buton', defaultValue: '/produse/' }),
        hero_imagine: fields.image({
          label: 'Hero - Imagine',
          description: 'Background hero (min 1920x1080px)',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),

        // DESPRE PREVIEW
        despre_titlu: fields.text({ label: 'Despre - Titlu', defaultValue: 'Cine suntem' }),
        despre_text: fields.markdoc({ label: 'Despre - Text (2-3 paragrafe)' }),
        despre_imagine: fields.image({
          label: 'Despre - Imagine',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),

        // PRODUSE FEATURED
        produse_titlu: fields.text({ label: 'Produse - Titlu Secțiune', defaultValue: 'Produsele noastre' }),
        produse_cta: fields.text({ label: 'Produse - Text Buton', defaultValue: 'Vezi toate produsele' }),

        // ARTICOLE RECENTE
        articole_titlu: fields.text({ label: 'Articole - Titlu Secțiune', defaultValue: 'Jurnal apicol' }),
        articole_cta: fields.text({ label: 'Articole - Text Buton', defaultValue: 'Vezi toate articolele' }),

        // CTA FINAL
        cta_final_titlu: fields.text({ label: 'CTA Final - Titlu', defaultValue: 'Vrei să comanzi miere naturală?' }),
        cta_final_text: fields.text({ label: 'CTA Final - Text', multiline: true }),
        cta_final_btn_contact: fields.text({ label: 'CTA Final - Buton Contact', defaultValue: 'Trimite mesaj' }),
        cta_final_btn_comanda: fields.text({ label: 'CTA Final - Buton Comandă', defaultValue: 'Comandă acum' }),

        content: fields.markdoc({ label: 'Conținut Adițional' }),
      },
    }),

    // PAGINA DESPRE
    despre: singleton({
      label: 'Despre',
      path: 'content/despre',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Titlu Pagină', defaultValue: 'Despre noi' }),
        imagine_hero: fields.image({
          label: 'Imagine Hero',
          description: 'Background hero (min 1920x1080px)',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),

        // POVESTEA
        poveste_titlu: fields.text({ label: 'Poveste - Titlu', defaultValue: 'Cine suntem' }),
        poveste_text: fields.markdoc({ label: 'Poveste - Text (3-5 paragrafe)' }),
        poveste_imagine: fields.image({
          label: 'Poveste - Imagine Portret',
          directory: 'static/images/uploads',
          publicPath: '/images/uploads/',
        }),

        // VALORI
        valori: fields.array(
          fields.object({
            titlu: fields.text({ label: 'Titlu' }),
            text: fields.text({ label: 'Text', multiline: true }),
          }),
          {
            label: 'Valori',
            description: 'Maxim 3 valori',
            itemLabel: (props) => props.fields.titlu.value || 'Valoare',
            validation: { length: { max: 3 } },
          }
        ),

        // GALERIE
        galerie: fields.array(
          fields.object({
            imagine: fields.image({
              label: 'Imagine',
              directory: 'static/images/uploads',
              publicPath: '/images/uploads/',
            }),
          }),
          {
            label: 'Galerie Stupină',
            description: '4-6 imagini cu stupina',
            itemLabel: (props) => `Imagine ${props.fields.imagine.value || ''}`,
          }
        ),

        content: fields.markdoc({ label: 'Conținut Adițional' }),
      },
    }),

    // PAGINA CONTACT
    contact: singleton({
      label: 'Contact',
      path: 'content/contact',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Titlu Pagină', defaultValue: 'Contact' }),
        intro: fields.text({ label: 'Text Intro', multiline: true }),

        email: fields.text({ label: 'Email' }),
        telefon: fields.text({ label: 'Telefon' }),
        locatie: fields.text({ label: 'Locație' }),
        program: fields.text({ label: 'Program', multiline: true }),
        maps_embed: fields.text({
          label: 'Google Maps Embed Code',
          multiline: true,
          description: 'Cod iframe Google Maps',
        }),

        content: fields.markdoc({ label: 'Conținut Adițional' }),
      },
    }),
  },
});
