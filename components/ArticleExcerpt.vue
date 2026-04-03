<script setup lang="ts">
import IconArrowRight from '~icons/fa-solid/arrow-right'
import { ParsedContent } from '@nuxt/content/dist/runtime/types';

const props = defineProps<{
    article: ParsedContent
    language: string
}>()
</script>

<template>
    <div class="flex flex-col shadow my-4">
        <div class="bg-white flex flex-col justify-start p-6">
            <NuxtLink v-for="tag in article.tags" :href="`/${props.language}/tag/${tag}`" :key="tag"
                class="text-blue-700 text-sm font-bold uppercase pb-4">{{ tag }}</NuxtLink>
            <NuxtLink :href="article._path" class="text-3xl font-bold hover:text-gray-700 pb-4">{{ article.title }}
            </NuxtLink>
            <ArticleAuthorship :language="props.language" author="Magno Machado" :published-date="article['timestamp']" />
            <NuxtLink :href="article._path" class="hover:opacity-75">
                <img :src="`/${article.id}.png`">
            </NuxtLink>
            <NuxtLink :href="article._path" class="pb-6">
                <ContentRenderer :value="article" excerpt />
            </NuxtLink>
            <NuxtLink :href="article._path" class="uppercase text-gray-800 hover:text-black">{{ props.language ==
                'pt' ? 'Continuar lendo' : 'Continue reading' }}
                <IconArrowRight class="inline" />
            </NuxtLink>
        </div>
    </div>
</template>