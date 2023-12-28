<template>
  <WelcomeItem>
    <div>
      <button @click="changeLanguage">
        <span v-if="i18n.global.locale === 'en'">🇺🇸</span>
        <span v-else>🇧🇷</span>
        {{ i18n.global.locale }}
      </button>
    </div>
  </WelcomeItem>
  <WelcomeItem>
    <template #heading>
      <div class="name-heading">
        {{ $t("welcome") }} Cristiano Rasweiler Neto
      </div>
    </template>
    <div class="social-links">
      <a href="https://github.com/neto112" target="_blank" title="Github">
        <IconGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/cristianorneto/"
        target="_blank"
        title="LinkedIn"
      >
        <IconLinkedin />
      </a>
      <a
        href="https://www.instagram.com/cristianorneto_/"
        target="_blank"
        title="Instagram"
      >
        <IconInstagram />
      </a>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>
      <div class="profile-heading">Profile</div>
      <div class="job-title">{{ $t("frontendDeveloper") }}</div>
      <div class="intro">
        {{ $t("hello", { age: myAge }) }}
      </div>
      <div class="stack-heading">{{ $t("stack") }}</div>
      <div class="skills">
        <div class="chip" v-for="(skill, idx) in skills" :key="idx">
          {{ skill.name }}
        </div>
      </div>
    </template>
  </WelcomeItem>
</template>

<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import IconGithub from "./icons/IconGithub.vue";
import IconLinkedin from "./icons/IconLinkedin.vue";
import IconInstagram from "./icons/IconInstagram.vue";
import { differenceInYears } from "date-fns";
import { computed, ref } from "vue";
import i18n from "@/languages";

const skills = ref([
  { name: "VueJS" },
  { name: "Vuetify" },
  { name: "React" },
  { name: "Python" },
  { name: "Javascript" },
  { name: "Typescript" },
  { name: "REST API" },
  { name: "Tailwind CSS" },
  { name: "DBeaver" },
]);

const dateOfBirth = ref("1995-03-25");

const myAge = computed(() => {
  const today = new Date();
  return differenceInYears(today, new Date(dateOfBirth.value));
});

const changeLanguage = () => {
  const newLocale = i18n.global.locale === "en" ? "pt" : "en";
  i18n.global.locale = newLocale;
};
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

button span {
  margin-right: 8px;
}

.name-heading {
  font-size: 40px;
}

.social-links {
  display: flex;
  margin-top: 20px;
}

a {
  margin-right: 10px;
  position: relative;
  display: inline-block;
}

a:hover::before {
  content: attr(title);
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

a:hover::before {
  opacity: 1;
}

.profile-heading {
  font-size: 24px;
  font-weight: bold;
}

.job-title {
  font-size: 18px;
  margin-top: 10px;
}

.intro {
  margin-top: 10px;
}

.stack-heading {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.chip {
  display: inline-block;
  padding: 0.5em 1em;
  margin: 0.5em;
  background-color: #2196f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>