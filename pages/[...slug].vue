<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';

const { path, params } = useRoute()

const article = ref<ParsedContent>()

queryContent(path).findOne().then((p) => article.value = p)

console.log(params)
</script>

<template>
  <ArticleControl :article="article" v-if="article" excerpt :language="params.slug[0]"/>
</template>
