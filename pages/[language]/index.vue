<script setup lang="ts">
import ListArticles from '@/components/ListArticles.vue';

const { params } = useRoute()

</script>

<template>
    <ContentList :query="{ path: params.language }" v-slot="{ list }">
        <ArticleControl excerpt :language="params.language" :article="article" v-for="article in list" :key="article._path"/>
    </ContentList>
</template>