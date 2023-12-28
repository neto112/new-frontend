import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en', // Defina o idioma padrão aqui
  messages: {
    en: {
      welcome: 'Welcome',
      profile: 'Profile',
      frontendDeveloper: 'Frontend Developer',
      hello: 'Hello! My name is Cristiano Rasweiler Neto, I\'m {age} years old. Currently, I work as a Frontend Developer with Javascript and Typescript using the VueJS framework.',
      stack: 'Stack',
    },
    pt: {
      welcome: 'Bem-vindo',
      profile: 'Perfil',
      frontendDeveloper: 'Desenvolvedor Frontend',
      hello: 'Olá! Meu nome é Cristiano Rasweiler Neto, tenho {age} anos. Atualmente, trabalho como Desenvolvedor Frontend com Javascript e Typescript usando o framework VueJS.',
      stack: 'Tecnologias',
    },
  },
});

export default i18n;
