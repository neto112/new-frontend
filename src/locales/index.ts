import { createI18n } from "vue-i18n";
import { en_US } from "./en_US";
import { es_ES } from "./es_ES";
import { pt_BR } from "./pt_BR";

const messages = {
  "pt-BR": pt_BR,
  "en-US": en_US,
  "es-ES": es_ES,
};

const i18n = createI18n({
  locale: "en-US", // Defina o idioma padrão aqui
  messages,
});

export default i18n;
