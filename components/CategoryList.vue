<script setup lang="ts">
import IconChevronUp from '~icons/fa-solid/chevron-up'
import IconChevronDown from '~icons/fa-solid/chevron-down'

const props = defineProps<{
    language: string
}>()

const { data: documents } = await useAsyncData('tags', () => queryContent(`/${props.language}`).only('tags').find())

const categories = computed(() =>
    documents.value?.map(d => d.tags?.at(0))
)

const isOpen = ref(false)

</script>

<template>
    <!-- Topic Nav -->
    <nav class="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
        <div class="block sm:hidden">
            <a href="#" class="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
                @click="isOpen = !isOpen">
                <IconChevronUp v-if="isOpen" />
                <IconChevronDown v-else />
            </a>
        </div>
        <div :class="isOpen ? 'block' : 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div
                class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                <a :href="`/${language}/tag/${category}`" class="hover:bg-gray-400 rounded py-2 px-4 mx-2"
                    v-for="category in categories">{{ category }}</a>
            </div>
        </div>
    </nav>
</template>