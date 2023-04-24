<script setup lang="ts">
import { ParsedContent, QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
import ListArticles from '@/components/ListArticles.vue';

const { params } = useRoute()

interface Category {
    folder: string
    labelPt: string
    labelEn: string
}

const categories: Category[] = [
    { folder: 'kotlin', labelPt: 'Kotlin', labelEn: 'Kotlin'}
]

const queryParams: QueryBuilderParams = {
    path: `/${params.language}`,
    where: [{ 'tags': { $contains: params.tag } }]
}
</script>

<template>
    <ContentList :query="queryParams" v-slot="{ list }">
        <ArticleControl excerpt :language="params.language" :article="article" v-for="article in list" :key="article._path"/>
    </ContentList>
</template>