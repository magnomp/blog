<script setup lang="ts">
import { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

const props = defineProps<{
    language: string
    query: QueryBuilderParams
}>()
</script>

<template>
    <ContentList :query="props.query">
        <template #default="{ list }">
            <ArticleExcerpt v-for="article in list" :key="article.path" :language="props.language" :article="article" />
        </template>
        <template #not-found>
            <p>Nenhum artigo encontrado</p>
        </template>
    </ContentList>
</template>