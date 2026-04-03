<script setup lang="ts">
import DisqusComments from './DisqusComments.vue';

const route = useRoute()

const props = defineProps<{
    language: string
}>()
const { data: article } = await useAsyncData('article', () => queryContent(route.path).findOne())

</script>

<template>
    <article v-if="article" class="flex flex-col shadow my-4">
        <div class="bg-white flex flex-col justify-start p-6">
            <NuxtLink v-for="tag in article.tags" :href="`/${props.language}/tag/${tag}`" :key="tag"
                class="text-blue-700 text-sm font-bold uppercase pb-4">{{ tag }}</NuxtLink>
            <NuxtLink :href="article._path" class="text-3xl font-bold hover:text-gray-700 pb-4">{{ article.title }}
            </NuxtLink>
            <ArticleAuthorship :language="props.language" author="Magno Machado" :published-date="article['timestamp']" />
            <!-- Article Image -->
            <NuxtLink :href="article._path" class="hover:opacity-75">
              <img :src="`/${article.id}.png`">
            </NuxtLink>
            <ContentRenderer :value="article" />
        </div>

        <DisqusComments :language="props.language" :disqus-id="article.id"/>
    </article>
</template>