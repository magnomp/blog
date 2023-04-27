<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';

const props = defineProps<{
    article: ParsedContent
    language: string
}>()
</script>

<template>
    <article class="flex flex-col shadow my-4">
        <!-- Article Image -->
        <NuxtLink :href="article._path" class="hover:opacity-75">
            <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1">
        </NuxtLink>
        <div class="bg-white flex flex-col justify-start p-6">
            <NuxtLink :href="`/${props.language}/tag/${article.tags[0]}`"
                class="text-blue-700 text-sm font-bold uppercase pb-4">{{ article.tags[0] }}</NuxtLink>
            <NuxtLink :href="article._path" class="text-3xl font-bold hover:text-gray-700 pb-4">{{ article.title }}
            </NuxtLink>
            <ArticleAuthorship :language="props.language" author="Magno Machado" :published-date="article['timestamp']"/>
            <NuxtLink :href="article._path" class="pb-6">
                <ContentRenderer :value="article" excerpt />
            </NuxtLink>
        <NuxtLink :href="article._path" class="uppercase text-gray-800 hover:text-black">{{ props.language == 'pt'?'Continuar lendo':'Continue reading' }}<i class="fas fa-arrow-right"></i></NuxtLink>
    </div>
</article></template>