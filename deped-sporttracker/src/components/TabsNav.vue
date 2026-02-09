<script setup>
const props = defineProps({
	active: {
		type: String,
		default: 'Home',
	},
})

const emit = defineEmits(['change'])

const tabs = ['Home', 'Sports', 'About Us']
</script>

<template>
	<nav class="mt-2 flex flex-wrap gap-6 text-[13px] font-semibold text-white" aria-label="Primary">
		<button
			v-for="tab in tabs"
			:key="tab"
			type="button"
			class="border-b-2 border-transparent bg-transparent pb-2 transition"
			:class="
				tab === props.active
					? 'border-white text-white'
					: 'text-white/80 hover:text-white'
			"
			@click="emit('change', tab)"
		>
			{{ tab }}
		</button>
	</nav>
</template>
