<script lang="ts">
    import { onMount } from "svelte";
    import { linear } from "svelte/easing";
    import { fade } from "svelte/transition";

    type Item = {
        src: string;
        top: string;
        left: string;
        size: number;
        rotate: number;
        opacity: number;
    };

    type Point = { x: number; y: number };

    const svgs: string[] = [
        "#broken_heart",
        "#dont_forget",
        "#duck",
        "#fist_left",
        "#haha",
        "#help",
        "#need_break",
        "#need_space",
        "#shhh",
        "#silence",
        "#sorry_forgot",
        "#sush",
        "#swear",
        "#logo"
    ];

    let spriteReady = $state(false);
    let items: Item[] = $state([]);

    const RECENT_LIMIT = 5;
    const recent: string[] = [];


    function rand(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function randInt(min: number, max: number) {
        return Math.floor(rand(min, max + 1));
    }

    function distance(a: Point, b: Point) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }



    function isInCenterZone(x: number, y: number, isMobile: boolean) {
        if (isMobile) {
            return (
                x > 0.1 && x < 0.9 &&
                y > 0.30 && y < 0.7
            );
        }
        
        return (
            x > 0.30 && x < 0.70 &&
            y > 0.25 && y < 0.75
        );
    }

    function getSizeConfig(isMobile: boolean) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        const minDim = Math.min(w, h);

        return {
            base: minDim / (isMobile ? 4 : 6),
            minFactor: isMobile ? 0.75 : 0.8,
            maxFactor: isMobile ? 1.25 : 1.4
        };
    }

    function getItemCount() {
        const area = window.innerWidth * window.innerHeight;
        const density = 0.000015;
        const raw = area * density;

        const min = 16;
        const max = 60;

        return Math.round(Math.min(max, Math.max(min, raw)));
    }


    function generatePoints(count: number, minDist: number, isMobile: boolean): Point[] {
        const points: Point[] = [];
        let tries = 0;

        while (points.length < count && tries < 8000) {
            tries++;

            const candidate: Point = {
                x: Math.random(),
                y: Math.random()
            };

            if (isInCenterZone(candidate.x, candidate.y, isMobile)) continue;

            let ok = true;

            for (const p of points) {
                if (distance(p, candidate) < minDist) {
                    ok = false;
                    break;
                }
            }

            if (ok) {
                points.push(candidate);
            }
        }

        return points;
    }

    function pickImage(): string {
        let tries = 0;

        while (tries < 10) {
            const img = svgs[randInt(0, svgs.length - 1)];

            if (!recent.includes(img)) {
                recent.push(img);

                if (recent.length > RECENT_LIMIT) {
                    recent.shift();
                }

                return img;
            }

            tries++;
        }

        return svgs[0];
    }


    function generate() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const count = getItemCount();

        const sizeCfg = getSizeConfig(isMobile);
        const minDist = isMobile ? 0.18 : 0.14;
        
        items = generatePoints(count, minDist, isMobile).map((p) => {
            const size = sizeCfg.base * rand(sizeCfg.minFactor, sizeCfg.maxFactor);

            return {
                src: pickImage(),
                top: `${p.y * 100}%`,
                left: `${p.x * 100}%`,
                size: size,
                rotate: rand(-25, 25),
                opacity: rand(0.45, 0.85)
            };
        });
    }

    onMount(() => {
        // preloading for transition
        const img = new Image();
        img.src = "/sprite.svg";

        if (img.decode) {
            img.decode().then(() => {
                spriteReady = true;
            }).catch(() => {
                spriteReady = true;
            });
        
        } else {
            img.onload = () => {
                spriteReady = true;
            };
        }
        
        
        function debounce(fn: typeof generate, wait: number) {
            let t: NodeJS.Timeout;

            return () => {
                clearTimeout(t);
                t = setTimeout(() => fn(), wait);
            };
        }

        generate();
        window.addEventListener("resize", debounce(() => generate(), 200));

        return () => window.removeEventListener("resize", debounce(() => generate(), 200));
    });
</script>

<div
    id="background"
    aria-hidden="true"
    class="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-linear-to-r from-black to-white"
>
    {#each items as item (item.src + item.top + item.left)}
        {#if spriteReady}
        <svg
            class="absolute select-none will-change-transform transform"
            width="100%"
            height="100%"
            style="
                top: {item.top};
                left: {item.left};
                width: {item.size}px;
                height: {item.size}px;
                transform: translate(-50%, -50%) rotate({item.rotate}deg);
                opacity: {item.opacity};
            "
            in:fade={{ duration: 1500, easing: linear }}
        >
            <use href={`/sprite.svg${item.src}`} />
        </svg>
        {/if}
    {/each}
</div>