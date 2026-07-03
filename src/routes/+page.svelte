<script>
    import Background from '$lib/background.svelte';
    import { resolve } from '$app/paths';

</script>


<div class="relative isolate flex min-h-dvh flex-col overflow-hidden fade-in" style:--duration="2s">
	<Background />

    <main class="relative z-10 flex flex-1 items-center justify-center text-center">
        <div class="flex flex-col items-center gap-6">

            <div class="flex flex-col items-center gap-2 text-black">       
                <h1 class="text-3xl font-bold md:text-[5rem] league-spartan">NOMENTIONZ</h1>
                <p class="text-sm font-medium md:text-[2.5rem] league-spartan">DUBUQUE, UNITED STATES | EST 1998</p>
            </div>

            <nav class="flex gap-6 text-2xl text-black md:gap-8 sm:text-[3rem]">
                <a href={resolve("/youtube")} aria-label="YouTube" class="hover:opacity-50 transition-opacity duration-300">
                    <i class="fa-brands fa-youtube"></i>
                </a>
                <a href={resolve("/spotify")} aria-label="Spotify" class="hover:opacity-50 transition-opacity duration-300">
                    <i class="fa-brands fa-spotify"></i>
                </a>
                <a href={resolve("/soundcloud")} aria-label="SoundCloud" class="hover:opacity-50 transition-opacity duration-300">
                    <i class="fa-brands fa-soundcloud"></i>
                </a>
                <a href={resolve("/tiktok")} aria-label="TikTok" class="hover:opacity-50 transition-opacity duration-300">
                    <i class="fa-brands fa-tiktok"></i>
                </a>
            </nav>

        </div>
    </main>

    <footer class="relative z-10 pb-6 text-center text-xs md:text-xl text-black league-spartan">
        &copy; 2026 NoMentionz. All rights reserved. - <a href="https://github.com/xRedCrystalx/nomentionz" rel="noreferrer" target="_blank" class="underline">Source code</a>
    </footer>
</div>