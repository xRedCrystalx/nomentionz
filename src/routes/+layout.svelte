<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.css';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="preload" href="/sprite.svg" as="image" type="image/svg+xml" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap" rel="stylesheet">

    <meta property="og:title" content="NoMentionz" />
    <meta property="og:description" content="Music for the overthinkers, the quiet fighters, and anyone turning pain into peace." />
    <meta property="og:image" content="https://www.nomentionz.com/preview.png" />
    <meta property="og:url" content="https://www.nomentionz.com" />

    <title>NoMentionz</title>
    <meta name="description" content="Music for the overthinkers, the quiet fighters, and anyone turning pain into peace." />
</svelte:head>

{@render children()}
